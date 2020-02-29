import { DefaultButton, IBaseButtonState, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';


interface IBProps extends IButtonProps{

}

interface IBState extends IBaseButtonState{

}

export default class Button extends React.Component<IBProps, IBState> {


  public render(): JSX.Element {
    return (
      <DefaultButton {...this.props}/>
    );
  }
}
