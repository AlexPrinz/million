import { clone, each } from 'lodash';
import { action, autorun, computed, observable, ObservableMap } from 'mobx';

interface IEntity {
  id: number;
}

export default abstract class BaseStore<EntityType extends IEntity> {
  @observable entities: ObservableMap<number, EntityType>;
  @observable openedEntities: ObservableMap<number, EntityType>;

  constructor() {
    this.entities = observable.map({});
    this.openedEntities = observable.map({});
  }

  setEntitiesFromData<IRawType>(
    data: IRawType[], createEntity: (data: IRawType) => EntityType,
  ) {
    const entities = data.map(dataEntry => createEntity(dataEntry));
    return this.refreshEntities(entities);
  }

  refreshEntities(entities: EntityType[]) {
    this.cleanEntities();

    entities.forEach(entity => {
      this.entities[entity.id] = entity;

      if (this.openedEntities[entity.id]) {
        this.openedEntities[entity.id] = entity;
      }
    });

    return entities;
  }

  cleanEntities() {
    this.entities = observable.map(clone(this.openedEntities));
  }
}

export { BaseStore };
