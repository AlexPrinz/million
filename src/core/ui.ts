import { computed } from 'mobx';

import { constants, translations } from '@/constants/statics';

class UI {



  // TODO: here is the perfect place to mixin additional constants not from downloadCenter...
  c: typeof constants = constants;
}

export const ui = new UI();

export default ui;
