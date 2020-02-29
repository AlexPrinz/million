import * as React from 'react';


interface IGridProps {
  className: string;
}

interface IGridState {

}

export default class Grid extends React.Component<IGridProps, IGridState> {


  public render(): JSX.Element {
    return (
      <div {...this.props}>

      </div>
    );
  }
}
