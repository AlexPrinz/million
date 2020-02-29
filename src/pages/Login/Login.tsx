import Ball from '@/components/Ball';
import Input from '@/components/Input';
import NumberGrid from '@/components/NumberGrid';
import { BACKGROUND_IMAGE } from '@/constants';
import { LottoStore } from '@/stores';
import * as globalTheme from '@/styles/globalTheme.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import * as React from 'react';
import StarfieldAnimation from 'react-starfield-animation';
import * as theme from './theme.scss';


import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

interface ILoginProps {
  lottoStore?: LottoStore;
}

@inject('lottoStore') @observer
export default class Login extends React.Component<ILoginProps> {

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
            extra={i === 6}
            number={this.number[i]}
          />
        </div>,
      );
    }
    return returnValue;
  }



  getMatchPer() {
    const returnValue = [];
    for (let i = 0; i < this.props.lottoStore.propability.length; i++) {
      returnValue.push(
        <div style={{ display: 'inline-block', margin: 'auto 3px' }}>
          <Ball
            size={'40px'}
            number={(this.props.lottoStore.propability[i] || 0).toFixed(1)}
          />
        </div>,
      );
    }
    return returnValue;
  }

  shouldHightlight(number, pos) {
    if (pos !== 6) {
      return this.number.indexOf(number) !== -1 && this.number.indexOf(number) !== 6;
    } else {
      return this.number[6] === number;
    }
  }


  getBestMatch() {
    const returnValue = [];
    for (let i = 0; i < this.props.lottoStore.bestFittingNumbers.length; i++) {
      returnValue.push(
        <div style={{ display: 'inline-block', margin: 'auto 3px' }}>
          <Ball
            extra={i === 6}
            hightlight={this.shouldHightlight(this.props.lottoStore.bestFittingNumbers[i], i)}
            size={'40px'}
            number={this.props.lottoStore.bestFittingNumbers[i]}
          />
        </div>,
      );
    }
    return returnValue;
  }

  getResponseDate() {
    if (this.props.lottoStore.response) {
      return (
        <div className={theme.responseHeader}>
          <h2 className={theme.header2}>Your win would be:</h2>
          {this.getBestMatch()}
          <h2 className={theme.header2}>Amount:</h2>
          <div className={theme.value}>{this.props.lottoStore.winAmount}€</div>
          <h2 className={theme.header2}>Date:</h2>
          <div className={theme.value}>{this.props.lottoStore.lastAppearence.getDate() - 1}.{this.props.lottoStore.lastAppearence.getMonth() + 1}.{this.props.lottoStore.lastAppearence.getFullYear()}</div>
          <h2 className={theme.header2}>Next win Percentage [%]:</h2>
          {this.getMatchPer()}
        </div>
      );
    }
    return null;
  }

  public render(): JSX.Element {

    /* tslint:disable */

    return (
      <div className={theme.pageWrapper}>
        <div className={theme.content}>
          <h1 className={theme.header}>Choose your numbers</h1>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', marginRight: 24 }}>
              <NumberGrid
                onChange={this.onChange}
              />
            </div>
            <div style={{ display: 'flex' }}>
              {this.getNumber()}
            </div>
          </div>
          <Button
            onClick={() => {
              debugger
              const num = JSON.stringify(toJS(this.number) as any as [number])
              this.props.lottoStore.checkNumber({ numbers: num })
            }}
            disabled={this.number.length !== 7} style={{
              borderRadius: 0,
              width: 190,
            }} variant="contained" color="primary">
            Check numbers
          </Button>
          {this.getResponseDate()}
        </div>
        <div className={theme.footer}>
        </div>
      </div >
    );
  }
}
