import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Number from './Number';
import * as theme from './theme.scss';


interface INumberGridProps {
  number: number;
  onChange: ([number]) => void;
}

interface INumberGridState {
  numbers: [number];
}

@observer
export default class NumberGrid extends React.Component<INumberGridProps, INumberGridState> {

  constructor(props) {
    super(props);
    this.state = { numbers: [] as any as [number] };
  }

  numberChecked = (number, check) => {
    let num: [number] = this.state.numbers;
    const tmpNum = [];
    if (check) {
      num.push(number);
    } else {
      for (let i = 0; i < num.length; i++) {
        if (num[i] !== number) {
          tmpNum.push(num[i]);
        }
      }
      num = tmpNum as [number];
    }
    this.setState({ numbers: num });
    this.props.onChange(num);

  }

  getRowValues(startValue) {
    const returnValue = [];
    for (let i = 1; i < 7; i++) {
      const val = (
        <td>
          <Number
            number={startValue + i}
            onClick={this.numberChecked}
          />
        </td>
      );
      returnValue.push(val);
    }
    return returnValue;
  }

  getGrid() {
    const returnValue = [];
    for (let i = 0; i < 7; i++) {
      const val = (
        <tr>
          {this.getRowValues(i * 7)}
        </tr>
      );
      returnValue.push(val);
    }

    return returnValue;
  }



  render() {

    return (
      <div className={theme.numberGrid} >
        <table className ={theme.numTable}>
          {this.getGrid()}
        </table>
      </div>
    );
  }
}
