import * as classNames from 'classnames';
import * as React from 'react';
import * as theme from './theme.scss';


type IGridSizeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ICellProps {
  className?: string;
  sm?: IGridSizeNumber;
  md?: IGridSizeNumber;
  lg?: IGridSizeNumber;
  xl?: IGridSizeNumber;
  xxl?: IGridSizeNumber;
  xxxl?: IGridSizeNumber;
}

interface ICellState {

}

export default class Cell extends React.Component<ICellProps, ICellState> {


  public render(): JSX.Element {
    const cellStyle = [];
    if (typeof this.props.sm !== 'undefined') {
      cellStyle.push(theme[`sm${this.props.sm}`]);
    }
    if (typeof this.props.md !== 'undefined') {
      cellStyle.push(theme[`md${this.props.md}`]);
    }
    if (typeof this.props.lg !== 'undefined') {
      cellStyle.push(theme[`lg${this.props.lg}`]);
    }
    if (typeof this.props.xl !== 'undefined') {
      cellStyle.push(theme[`xl${this.props.xl}`]);
    }
    if (typeof this.props.xxl !== 'undefined') {
      cellStyle.push(theme[`xxl${this.props.xxl}`]);
    }
    if (typeof this.props.xxxl !== 'undefined') {
      cellStyle.push(theme[`xxxl${this.props.xxxl}`]);
    }

    return (
      <div className={classNames(...cellStyle, this.props.className, theme.col)}>
        {this.props.children}
      </div>
    );
  }
}
