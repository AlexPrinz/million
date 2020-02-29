import { get } from '@/core/Request';
import { each } from 'lodash';
import { action,  computed, observable } from 'mobx';

interface ICategoryRawData {
  id: number;
  name: string;
}

interface ICategory extends ICategoryRawData {
}

export default class Category implements ICategory{
  id: number;
  name: string;

  constructor(data: ICategoryRawData) {
    each(data, (value, key) => {
      this[key] = value;
    });
  }
}

export { ICategory, ICategoryRawData, Category };
