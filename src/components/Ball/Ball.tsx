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
      <div className={theme.ball}>
        Hallo
      </div>
      <div className = {theme.ball} backgroundColor=white>
      Hello World
      </div>
      
      <table>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>

    );
  }
}
