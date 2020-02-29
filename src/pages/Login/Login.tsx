import Ball from '@/components/Ball';
import Input from '@/components/Input';
import NumberGrid from '@/components/NumberGrid';
import { BACKGROUND_IMAGE } from '@/constants';
import * as globalTheme from '@/styles/globalTheme.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import * as React from 'react';
import StarfieldAnimation from 'react-starfield-animation';
import * as theme from './theme.scss';


import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

@observer
export default class Login extends React.Component {

  @observable number = [];

  getStyle(): Object {
    return { '--background': `url( ${BACKGROUND_IMAGE} )` };
  }

  onChange = (number: [number]) => {
    this.number = number;
  }

  getNumber = () => {
    const returnValue = [];
    for (let i = 0; i < this.number.length; i++) {
      returnValue.push(
        <div style={{ display: 'inline-block', margin: 'auto 6px' }}>
          <Ball
            number={this.number[i]}
          />
        </div>,
      );
    }
    return returnValue;
  }

  public render(): JSX.Element {

    /* tslint:disable */

    return (
      <div className={theme.pageWrapper}>
        <div className={theme.content}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', marginRight: 24 }}>
              <NumberGrid
                number={5}
                onChange={this.onChange}
              />
            </div>
            <div style={{ display: 'flex' }}>
              {this.getNumber()}
            </div>
          </div>
        </div>
        <div className={theme.footer}>
        </div>
      </div>
    );
  }
}
