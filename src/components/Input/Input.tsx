import { ITextFieldProps,  ITextFieldState, TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';

interface IInputProps extends ITextFieldProps{
  onBeforeChange: (value: string) => void;
}

interface IInputState extends ITextFieldState{

}

export default class Input extends React.Component<IInputProps, IInputState> {


  public render(): JSX.Element {
    return (
      <div>
        <TextField {...this.props}/>
      </div>
    );
  }
}
