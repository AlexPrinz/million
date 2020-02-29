import { get, post } from '@/core/Request';
import { sortBy } from 'lodash';
import { action, observable } from 'mobx';

export class LottoStore {
  @observable response = false;
  @observable lastAppearence;
  @observable bestFittingNumbers;
  @observable propability;
  @observable winAmount;




  checkNumber = get<{numbers: string}, any, void>({
    endpoint: '',
    success: (data) => {
      debugger;
      this.response = true;
      this.lastAppearence = new Date(data.lastAppearence);
      this.bestFittingNumbers = data.bestFittingNumbers;
      this.propability = data.propability;
      this.winAmount = data.winAmount;
    },
  });
}

export const lottoStore = new LottoStore();
export default lottoStore as LottoStore;
