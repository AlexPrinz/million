import Input from '@/components/Input';
import { BACKGROUND_IMAGE } from '@/constants';
import * as globalTheme from '@/styles/globalTheme.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
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
      <div
        style={this.getStyle()}
        className={theme.login}
      >
        <div className={classNames({
          [theme.loginActions]: true,
        })}>
          <div className={theme.header}>
            Login
          </div>
          <div className={theme.inputWrapper}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined" />
          </div>
          <div className={theme.inputWrapper}>
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
            />
          </div>
          <Button
            className={theme.loginButton}
            variant="contained"
            color="primary"
          >
            Login
          </Button>

        </div>
      </div>
    );
  }
}
