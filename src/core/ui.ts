import { computed } from 'mobx';
import * as moment from 'moment';

import { constants, translations } from '@/constants/statics';

class UI {
  date(timestamp: string) {
    return moment(timestamp).format('DD.MM.YYYY');
  }

  time(timestamp: string) {
    return moment(timestamp).format('HH:mm');
  }

  datetime(timestamp: string) {
    return moment(timestamp).format('DD.MM.YYYY HH:mm');
  }


  // TODO: here is the perfect place to mixin additional constants not from downloadCenter...
  c: typeof constants = constants;
}

export const ui = new UI();

export default ui;
