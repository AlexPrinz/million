
import * as React from 'react';
import * as theme from './theme.scss';

interface ITallyProps {
  number: number;
}


export default class Tally extends React.Component<ITallyProps> {

  getTally() {
    const tally: JSX.Element[] = [];
    for (let i = 0; i < this.props.number; i++) {
      tally.push(<li/>);
    }
    return tally;
  }

  public render(): JSX.Element {
    return (
      <div className={theme.tally}>
        {this.getTally()}
      </div>
    );
  }
}
