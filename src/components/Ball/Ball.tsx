import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as theme from './theme.scss';


interface IBallProps {
  number: number | string;
  size?: string;
  hightlight?: boolean;
  extra?: boolean;
}

@observer
export default class Ball extends React.Component<IBallProps> {

  render() {

    const size = this.props.size || '120px';

    let className = theme.ball;
    if (this.props.extra) {
      className += ' ';
      className += theme.extraBall;
    }

    if (this.props.hightlight) {
      className += ' ';
      className += theme.hightlight;
    }
    return (
      <div style={{ '--size': size } as React.CSSProperties} className={className}>
        <div className={theme.number}>{this.props.number}</div>
      </div>
    );
  }
}
