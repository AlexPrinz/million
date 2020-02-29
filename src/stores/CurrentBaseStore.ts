import { clone, each } from 'lodash';
import { action, autorun, computed, observable, ObservableMap } from 'mobx';
import { BaseStore } from './BaseStore';

interface IEntity {
  id: number;
}

interface EntityConstructor<
  EntityType extends IEntity,
  RawType extends IEntity
> {
  new (raw: RawType): EntityType;
}

export default abstract class CurrentBaseStore<
  EntityType extends IEntity,
  RawType extends IEntity,
> extends BaseStore<EntityType> {
  @observable current: EntityType;

  private _entityConstructor: EntityConstructor<EntityType, RawType>;

  constructor(entityConstructor: EntityConstructor<EntityType, RawType>) {
    super();

    this._entityConstructor = entityConstructor;
    this.current = null;
  }

  unsetCurrent() {
    this.current = null;
  }

  setCurrent(id: number) {
    this.current = null;
    each(this.entities, (rawData: RawType) => {
      if (rawData.id === id) {
        this.current = new this._entityConstructor(rawData);
        return false;
      }
    });
  }
}

export { CurrentBaseStore };
