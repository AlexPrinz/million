import * as classNames from 'classnames';
import * as React from 'react';
import * as theme from './theme.scss';

interface IRowProps {
  className?: string;
}

interface IRowState {

}

export default class Row extends React.Component<IRowProps, IRowState> {


  public render(): JSX.Element {
    return (
      <div className={classNames(this.props.className, theme.row)}>
        {this.props.children}
      </div>
    );
  }
}
