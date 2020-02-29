import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as theme from './theme.scss';


interface IBallProps {
  number: number;
}

@observer
export default class Ball extends React.Component<IBallProps> {

  render() {
    return (
      <div style={{ '--size': '120px' } as React.CSSProperties} className={theme.ball}>
        <div className={theme.number}>{this.props.number}</div>
      </div>
    );
  }
}
