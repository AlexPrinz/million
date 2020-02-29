import { get, post } from '@/core/Request';
import { sortBy } from 'lodash';
import { action, observable } from 'mobx';

export class LottoStore {
  @observable ePOUsers: [any];

  getCoffeUser = get<{}, [any], void>({
    endpoint: 'ePO/getUsers',
    success: (data) => {
      data.sort((u1, u2) => {
        return (u2.beans + u2.grounds + u2.water + u2.combo) -
               (u1.beans + u1.grounds + u1.water + u1.combo);
      });
      this.ePOUsers = data;
    },
  });

  addPoints = get<{beans: boolean, water: boolean, grounds: boolean}, [any], void>({
    endpoint: 'ePO/addPoints',
    success: (data) => {
      data.sort((u1, u2) => {
        return (u2.beans + u2.grounds + u2.water + u2.combo) -
               (u1.beans + u1.grounds + u1.water + u1.combo);
      });
      this.ePOUsers = data;
    },
  });
}

export const lottoStore = new LottoStore();
export default lottoStore as LottoStore;
