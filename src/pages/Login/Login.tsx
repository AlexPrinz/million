import Ball from '@/components/Ball';
import Input from '@/components/Input';
import { BACKGROUND_IMAGE } from '@/constants';
import * as globalTheme from '@/styles/globalTheme.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import * as React from 'react';
import StarfieldAnimation from 'react-starfield-animation';
import * as theme from './theme.scss';




export default class Login extends React.Component {


  getStyle(): Object {
    return { '--background': `url( ${BACKGROUND_IMAGE} )` };
  }


  public render(): JSX.Element {

    /* tslint:disable */

    return (
      <Ball
        number={5}
      />
    );
  }
}
