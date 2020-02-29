import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as theme from './theme.scss';


interface INumberGridProps {
  number: number;
}

@observer
export default class NumberGrid extends React.Component<INumberGridProps> {

  render() {

    return (
      <div className={theme.numberGrid}>
        Hallo
      </div>
    );
  }
}
