import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as theme from './theme.scss';


interface INumberProps {
  number: number;
  onClick: (number, boolean) => void;
}

interface INumberState {
  checked: boolean;
}

@observer
export default class Number extends React.Component<INumberProps, INumberState> {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  onCheck = () => {
    this.props.onClick(this.props.number, !this.state.checked);
    this.setState({ checked: !this.state.checked });
  }

  render() {

    return (
      <div onClick={this.onCheck} className={theme.number}>
        {this.props.number}
      </div>
    );
  }
}
