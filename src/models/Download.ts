import { get } from '@/core/Request';
import { each } from 'lodash';
import { action,  computed, observable } from 'mobx';

interface IDownloadRawData {
  id: number;
  filename: string;
  size: string;
  description: string;
  version: string;
  uploadDate: number;
}

interface IDownload extends Pick<IDownloadRawData, Exclude<keyof IDownloadRawData, 'uploadDate'>> {
  uploadDate: Date;
}

export default class Download implements IDownload{
  id: number;
  filename: string;
  size: string;
  description: string;
  version: string;
  uploadDate: Date;

  constructor(data: IDownloadRawData) {
    each(data, (value, key) => {
      if (key === 'uploadDate') {
        this[key] = new Date(value);
      } else {
        this[key] = value;
      }
    });
  }
}

export { IDownload, IDownloadRawData, Download };
