import Axios, { AxiosResponse } from 'axios';
import { Promise } from 'es6-promise';
import { each, find, isArray, isObject, merge, template } from 'lodash';
import { action, autorun, computed, observable, observe } from 'mobx';
import { isFunction } from 'util';
import { API_ROOT } from '../constants';
import { lowerCaseFirstLetter } from './util';

export type PushDataMethod = 'PATCH' | 'POST' | 'PUT';
export type NonPushDataMethod = 'GET' | 'HEAD' | 'DELETE';
export type RequestMethod = PushDataMethod | NonPushDataMethod;
export type BeforeResponse<RequestData> = void | false | RequestData;

export interface ErrorResponse {
  errorMessage: string;
  httpStatus: number;
}

export interface IAPIRequestParams<
  ExecutionParams extends Record<string, any>,
  ResponseType extends DownloadCenter.ParamType,
  CallbackType,
  RequestData extends Record<string, any> = ExecutionParams,
> {
  endpoint: string;
  responseType?: XMLHttpRequestResponseType;
  success?: (response: ResponseType) => CallbackType;
  error?: (response: ErrorResponse) => ErrorResponse;
  before?: (data: ExecutionParams) => BeforeResponse<RequestData>;
  isLoading?: boolean;
  onChangeLoadingStatus?:
    (isLoading: boolean, initiated: boolean, pendingRequestCtr: number) => void;
}

type RequestExecutor<ExecutionParams, CallbackType> =
  (params: ExecutionParams) => Promise<CallbackType>;

type MergedAPIRequestParams<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType,
  CallbackType,
  RequestData = ExecutionParams
> = IAPIRequestParams<
  ExecutionParams, ResponseType, CallbackType, RequestData
> & {method: RequestMethod};

interface BaseDownloadCenterResponse<ResponseType extends DownloadCenter.ParamType> {
  data?: ResponseType;
  errorMessage?: string;
  msg?: string;
  error?: string;
}

interface APIAxiosError<ResponseType extends DownloadCenter.ParamType> {
  response: AxiosResponse<ResponseType>;
}

interface Payload {
  sessionKey: string;
  responseType: XMLHttpRequestResponseType;
}

interface IAxiosRequestParams<Data> {
  method: RequestMethod;
  url: string;
  data?: RequestMethod extends PushDataMethod ? ((Data & Payload) | FormData) : Data;
  params?: RequestMethod extends PushDataMethod ? undefined : (Payload & Data);
}

// there already exists a 'Request' interface in typescript
export default class APIRequest<
  ExecutionParams extends Record<string, any>,
  ResponseType extends DownloadCenter.ParamType,
  CallbackType,
  RequestData extends Record<string, any> = ExecutionParams,
> {
  readonly method: RequestMethod;
  readonly endpoint: string;
  readonly responseType: XMLHttpRequestResponseType;
  readonly success: (response: ResponseType)
    => CallbackType;
  readonly error: (error: ErrorResponse) => ErrorResponse;
  readonly before: (params: ExecutionParams) => BeforeResponse<RequestData>;
  readonly onChangeLoadingStatus?:
    (isLoading: boolean, initiated: boolean, requestCounter: number) => void;

  @observable private _requestCounter: number;
  @observable private _initiated: boolean; // invoked at least one time with successful response

  constructor(buildParams: IAPIRequestParams<
    ExecutionParams, ResponseType, CallbackType, RequestData
  > & { method: RequestMethod }) {
    this.method = buildParams.method;
    this.endpoint = buildParams.endpoint;
    this.responseType = buildParams.responseType || 'json';
    this.success = buildParams.success;
    this.error = buildParams.error;
    this.before = buildParams.before;
    this.onChangeLoadingStatus = buildParams.onChangeLoadingStatus;
    this._requestCounter = 0;
    this._initiated = false;
  }

  @computed get isLoading() {
    return this._requestCounter > 0;
  }

  isLoadingDisposable = autorun(() => {
    const isLoading = this.isLoading;
    const requestCounter = this._requestCounter;
    const initiated = this._initiated;

    if (typeof this.onChangeLoadingStatus === 'function') {
      this.onChangeLoadingStatus(isLoading, initiated, requestCounter);
    }
  });

  private _convertIncomingParams<
    ResponseType extends DownloadCenter.ParamType
  >(data: ResponseType): DownloadCenter.ParamType {
    if (data === null || typeof data === 'undefined') {
      return data;
    } else if (isArray(data)) {
      return data.map(
        element => this._convertIncomingParams(element),
      );
    } else if (isObjectParam(data)) {
      const newObject = {};

      Object.keys(data).forEach(key => {
        newObject[lowerCaseFirstLetter(key)] = this._convertIncomingParams(data[key]);
      });

      return newObject;
    } else {
      return data;
    }
  }

  private _convertOutgoingParams(data: DownloadCenter.ParamType): DownloadCenter.ParamType {
    if (data === null || typeof data === 'undefined') {
      return data;
    } else if (isArray(data)) {
      return data.map(element => this._convertOutgoingParams(element));
    } else if (isObjectParam(data)) {
      const newObject = {};

      Object.keys(data).forEach(key => {
        newObject[key] = this._convertOutgoingParams(data[key]);
      });

      return newObject;
    } else {
      return data;
    }
  }

  private _outerConvertOutgoingParams(
    data: DownloadCenter.ObjectParamType,
  ): DownloadCenter.ObjectParamType {
    const newObject = {};

    Object.keys(data).forEach(key => {
      newObject[key] = this._convertOutgoingParams(data[key]);
    });

    return newObject;
  }

  /**
   * handleBefore - Calls this.before if defined
   *
   * This method will check if this.before is a function and will call it if so.
   * The this.before method can return false to cancel the request, undefined to
   * not modify the request data, or new request data.
   *
   * @private
   * @memberof APIRequest
   */
  @action
  private _handleBefore = (params: ExecutionParams): ExecutionParams | RequestData | false => {
    if (typeof this.before === 'function') {
      const beforeResponse: BeforeResponse<RequestData> = this.before(params);

      if (beforeResponse === false) {
        return false;
      } else if (typeof beforeResponse === 'undefined' || beforeResponse === null) {
        return params;
      } else {
        return beforeResponse;
      }
    } else {
      return params;
    }
  }

  private _hasInstanceOf = (klass: any, objects: DownloadCenter.ObjectParamType) => {
    let matchFound = false;

    find(objects, (obj: DownloadCenter.ParamType) => {
      // tslint:disable-next-line:no-unsafe-any
      if (obj instanceof klass) {
        return matchFound = true;
      }
    });

    return matchFound;
  }

  private _buildRequestParams = (params: RequestData | ExecutionParams):
    IAxiosRequestParams<RequestData | ExecutionParams> => {

    const convertedParams = this._outerConvertOutgoingParams(params);

    const url = this.buildUrl(convertedParams);
    const paramsWithoutData = {
      url,
      baseURL: API_ROOT,
      method: this.method,
    };
    const payload = {
      sessionKey: window.sessionStorage.getItem('session_id'),
      responseType: this.responseType,
    };

    if (this.method === 'POST' || this.method === 'PUT' || this.method === 'PATCH') {
      if (this._hasInstanceOf(File, convertedParams)) {
        const formdata = new FormData();

        each(convertedParams, (v: any, k: string) => {
          if (isObject(v) && !(v instanceof File)) {
            formdata.append(k, JSON.stringify(v));
          } else {
            formdata.append(k, <any> v);
          }
        });

        formdata.append('sessionKey', payload.sessionKey);
        formdata.append('responseType', payload.responseType);

        return merge(paramsWithoutData, { data: formdata });
      } else {
        return merge(paramsWithoutData, { params: merge(payload, convertedParams) });
      }

    } else {
      // get, delete, and head dont have data
      return merge(paramsWithoutData, { params: merge(payload, convertedParams) });
    }
  }

  buildUrl(requestData: DownloadCenter.ParamType) {
    return APIRequest.BUILD_URL(this.endpoint, requestData);
  }

  @action
  private _handleSuccess = (
    response: AxiosResponse<BaseDownloadCenterResponse<ResponseType> & ResponseType>,
  ): CallbackType => {
    if (response.data.errorMessage) {
      this._requestCounter--;
      throw {
        response: {
          data: {
            errorMessage:
              response.data.errorMessage || response.data.msg || response.data.error || '',
          },
          status: response.status,
        },
      };
    }

    if (typeof this.success === 'function') {
      // map data to camelCase -> cast is required at this place
      const result = this.success(this._convertIncomingParams(response.data.data) as ResponseType);

      this._requestCounter--;
      this._initiated = true;

      return result;
    } else {
      this._requestCounter--;
      return response.data as any as CallbackType;
    }
  }

  @action
  private _handleError = (
    error: APIAxiosError<BaseDownloadCenterResponse<ResponseType>>,
  ): any => {
    this._requestCounter--;

    if (!error.response) {
      return;
    }
    const err = {
      errorMessage: error.response.data.errorMessage || error.response.data.error || '',
      httpStatus: error.response.status,
    };

    if (typeof this.error === 'function') {
      this.error(err);
    } else {
      throw err;
    }
  }

  @action
  execute(params: ExecutionParams): Promise<CallbackType> {
    const beforeResponse = this._handleBefore(params);

    if (beforeResponse === false) {
      return Promise.resolve(null);
    }

    const requestData: RequestData | ExecutionParams = beforeResponse;
    const requestParams: IAxiosRequestParams<RequestData | ExecutionParams> =
          this._buildRequestParams(requestData);

    this._requestCounter++;

    return Axios.request<BaseDownloadCenterResponse<ResponseType> & ResponseType>(requestParams)
        .then(this._handleSuccess)
        .catch(this._handleError) as
        Promise<CallbackType>;
  }

  static BUILD_URL<ExecutionParams>(endpoint: string, params: ExecutionParams) {
    const pattern = /:(\w+)/g;
    const interpolation: Partial<ExecutionParams> = {};
    const tpl = template(endpoint, { interpolate: pattern });

    let match = pattern.exec(endpoint);
    let key: string = null;

    while (match !== null) {
      key = match[1];
      interpolation[key] = params[key];
      match = pattern.exec(endpoint);
    }

    const url = tpl(interpolation);

    return url;
  }
}

function isObjectParam(data: DownloadCenter.ParamType): data is DownloadCenter.ObjectParamType {
  return typeof data === 'object';
}

function request<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType = undefined,
  CallbackType = undefined,
  RequestData = ExecutionParams
>(
  params: MergedAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  const request = new APIRequest(params);

  return (params: ExecutionParams): Promise<CallbackType> => {
    return request.execute(params);
  };
}

function get<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType,
  CallbackType,
  RequestData = ExecutionParams
>(
  params: IAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  return request<ExecutionParams, ResponseType, CallbackType, RequestData>(
    merge(params, { method: 'GET' as RequestMethod }),
  );
}

function head<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType,
  CallbackType = undefined,
  RequestData = ExecutionParams
>(
  params: IAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  return request<ExecutionParams, ResponseType, CallbackType, RequestData>(
    merge(params, { method: 'HEAD' as RequestMethod }),
  );
}

function delete_<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType = undefined,
  CallbackType = undefined,
  RequestData = ExecutionParams
>(
  params: IAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  return request<ExecutionParams, ResponseType, CallbackType, RequestData>(
    merge(params, { method: 'DELETE' as RequestMethod }),
  );
}

function post<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType = undefined,
  CallbackType = undefined,
  RequestData = ExecutionParams
>(
  params: IAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  return request<ExecutionParams, ResponseType, CallbackType, RequestData>(
    merge(params, { method: 'POST' as RequestMethod }),
  );
}

function put<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType = undefined,
  CallbackType = undefined,
  RequestData = ExecutionParams
>(
  params: IAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  return request<ExecutionParams, ResponseType, CallbackType, RequestData>(
    merge(params, { method: 'PUT' as RequestMethod }),
  );
}

function patch<
  ExecutionParams,
  ResponseType extends DownloadCenter.ParamType = undefined,
  CallbackType = undefined,
  RequestData = ExecutionParams
>(
  params: IAPIRequestParams<ExecutionParams, ResponseType, CallbackType, RequestData>,
): RequestExecutor<ExecutionParams, CallbackType> {
  return request<ExecutionParams, ResponseType, CallbackType, RequestData>(
    merge(params, { method: 'PATCH' as RequestMethod }),
  );
}

export { APIRequest, request, get, head, delete_, post, put, patch };
