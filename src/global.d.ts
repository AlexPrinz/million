// THIS FILE IS FOR GLOBALLY AVAILABLE TYPE DECLARATIONS

declare global {

  namespace DownloadCenter {
    type PageType = 'login' | 'downloads';
    type DisplayableColumn<T> = {
      key: keyof T,
      displayed: boolean,
      width?: number,
    };
    type ViewType = 'list' | 'table';
    type IdType = number;

    type SingleParamType = Object | string | number | boolean;
    type ParamType = SingleParamType | SingleParamType[];
    type ObjectParamType = {[key: string]: ParamType};
  }
}

export{};
