import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as theme from './theme.scss';


interface IBallProps {
  number: number;
  extra?: boolean;
}

@observer
export default class Ball extends React.Component<IBallProps> {

  render() {

    let className = theme.ball
    if ( this.props.extra ) {
      className += " "
      className += theme.extraBall;
    }
    return (
      <div style={{ '--size': '120px' } as React.CSSProperties} className={className}>
        <div className={theme.number}>{this.props.number}</div>
      </div>
    );
  }
}
