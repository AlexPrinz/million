import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import * as theme from './theme.scss';


interface IStatusProps {
  status: number;
  size?: number;
  style: {[key: string]: any};
}

interface IStatusState {
}


export default class Status extends React.Component<IStatusProps, IStatusState> {

  getIcon(): string {
    switch (this.props.status){
      case 7:
        return 'Error';
      case 2:
        return 'Edit';
      case 6:
        return 'Print';
      case 5:
        return 'Print';
      case 4:
        return 'Lock';
      case 3:
        return 'Edit';
      case 1:
        return 'Delete';
      default:
        return '';
    }
  }
  getStyle(): Object {
    const tmpStyle: {[key: string]: any} = this.props.style || {};
    const size: number = this.props.size || 36;
    tmpStyle['width'] = `${ size }px`;
    tmpStyle['height'] = `${ size }px`;
    return tmpStyle;
  }

  getIconSyle(): Object {
    const iconSyle = {};
    const size: number = this.props.size || 36;
    iconSyle['lineHeight'] = `${ size }px`;
    iconSyle['height'] = `${ size }px`;
    iconSyle['fontSize'] = `${ size * 0.45 }px`;
    return iconSyle;
  }

  public render(): JSX.Element {
    return(
      <div style={this.getStyle()} className={theme.status}>
        <div className={theme.icon}>
          <Icon style={this.getIconSyle()} iconName={this.getIcon()}/>
        </div>
      </div>
    );
  }
}
