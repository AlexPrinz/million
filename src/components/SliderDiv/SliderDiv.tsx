import * as React from 'react';

import { clone, isFunction } from 'lodash';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as theme from './theme.scss';


interface ISliderDivProps {
  slideWidth: boolean;
  styleProps: any;
  name?: string;
  willUpdateHeight?: () => void;
  didUpdateHeight?: () => void;
  willUpdateWidth?: () => void;
  didUpdateWidth?: () => void;
  slideHeight?: number;
}

@observer
export default class SliderDiv extends React.Component<ISliderDivProps> {

  @observable realHeight = 0;
  @observable realWidth = 0;
  styleProps = {};

  name = this.props.name || this.generateID( );

  componentDidUpdate() {
    this.triggerCalculation();
  }

  generateID( ) {
    const S4 = () => {
      return (((1 + Math.random( )) * 0x10000) | 0).toString(16).substring(1);
    };
    return (Date.now( ) + '-' + S4( ) + S4( ) + '-' + S4( ) + '-' + S4( ) + '-' + S4( ) + '-' + S4( ) + S4( ) + S4( ));
  }

  componentDidMount() {
    this.triggerCalculation();
    const div = document.getElementById(this.name);
    div.addEventListener('DOMSubtreeModified', this.triggerCalculation.bind(this));
    div.addEventListener('DOMNodeInserted', this.triggerCalculation.bind(this));
    div.addEventListener('DOMNodeRemoved', this.triggerCalculation.bind(this));
  }


  componentWillUnmount() {
    const div = document.getElementById(this.name);
    div.removeEventListener('DOMSubtreeModified', this.triggerCalculation.bind(this));
    div.removeEventListener('DOMNodeInserted', this.triggerCalculation.bind(this));
    div.removeEventListener('DOMNodeRemoved', this.triggerCalculation.bind(this));
  }

  triggerCalculation( ) {
    const me = this;
    setTimeout(this.calcStyle.bind(this), 10);
  }

  calcStyle() {
    const { styleProps, ...otherProps } = this.props;
    // have to get maxHeight and maxWidth out of style properties. Css would not slide
    // because they are other properties than height and width
    const { height, maxHeight, minHeight, width, maxWidth, minWidth, ...sliderStyleProps } = styleProps;
    this.styleProps = clone(sliderStyleProps);

    const name = this.name;
    const sliderDiv = document.getElementById(name);
    if (!sliderDiv) {
      return;
    }
    let tmpHeight = sliderDiv.clientHeight;
    let tmpWidth = sliderDiv.clientWidth;

    if (maxHeight !== undefined) {
      tmpHeight = Math.min(tmpHeight, maxHeight);
    }
    if (minHeight !== undefined) {
      tmpHeight = Math.max(tmpHeight, minHeight);
    }
    if (maxWidth !== undefined) {
      tmpWidth = Math.min(tmpWidth, maxWidth);
    }
    if (minWidth !== undefined) {
      tmpWidth = Math.max(tmpWidth, minWidth);
    }

    if (this.realHeight !== tmpHeight) {
      if (isFunction(this.props.willUpdateHeight)) {
        this.props.willUpdateHeight(tmpHeight);
      }
      this.realHeight = tmpHeight;
      if (isFunction(this.props.didUpdateHeight)) {
        this.props.didUpdateHeight(tmpHeight);
      }
    }

    if (this.realWidth !== tmpWidth) {
      if (isFunction(this.props.willUpdateWidth)) {
        this.props.willUpdateWidth(tmpWidth);
      }
      this.realWidth = tmpWidth;
      if (isFunction(this.props.didUpdateWidth)) {
        this.props.didUpdateWidth(tmpWidth);
      }
    }
  }

  render() {
    const style = this.styleProps || {};
    if (this.props.slideHeight || this.props.slideHeight === undefined) {
      style['height'] = this.realHeight;
    }
    if (this.props && (this.props.slideWidth || this.props.slideWidth === undefined)) {
      style['width'] = this.realWidth;
    }
    style['overflow'] = 'hidden';

    return (
      <div
        className={theme.sliderDiv}
        style={style}
      >
        <div
          ref={this.name}
          id = { this.name }
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}
