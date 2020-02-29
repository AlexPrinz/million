import Button from '@/components/Button';
import { Cell, Row } from '@/components/Grid';
import { SMALL_GUI_WIDTH } from '@/constants';
import { IUser } from '@/models/User';
import * as globalTheme from '@/styles/globalTheme.scss';
import * as classNames from 'classnames';
import { each, map } from 'lodash';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import UserMenu from '../UserMenu';
import * as theme from './theme.scss';


type PageType = {
  name: string,
  key: string,
  icon?: string,
};

interface IAppBarProps {
  activePage: string;
  onPageChange?: (page: string) => void;
  pages: PageType[];
  logout: () => void;
  user: IUser;
}

interface IAppBarState {
  smallGui: boolean;
  showPanel: boolean;
}

export default class AppBar extends React.Component<IAppBarProps, IAppBarState> {

  state: IAppBarState = {
    smallGui: false,
    showPanel: false,
  };

  updateDimensions = () => {
    if ((window.innerWidth < SMALL_GUI_WIDTH) !== this.state.smallGui) {
      this.setState({ smallGui: window.innerWidth < SMALL_GUI_WIDTH, showPanel: false  });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  changePage(selectedPage: string) {
    if (typeof this.props.onPageChange === 'function') {
      this.props.onPageChange(selectedPage);
    }
  }

  getPagesSmall(): { name: string, onClick: () => {}, key: string, url: string }[] {
    return map(this.props.pages, (page) => {
      return {
        name: page.name,
        onClick: this.changePage.bind(this, page.key),
        key: page.key,
        url: '',
      };
    });
  }

  getActivePage():PageType {
    let activePage: PageType = { name: '', key: '' };
    each(this.props.pages, (page: PageType) => {
      if (page.key === this.props.activePage) {
        activePage = page;
        return false;
      }
    });
    return activePage;
  }

  getSmallGui(): JSX.Element[] {
    return [
      <Button
        text=""
        className={ theme.button}
        onClick={() => this.setState({ showPanel: true })}
        iconProps={{ iconName: 'CollapseMenu' }}
      />,
      <h1>{this.getActivePage().name}</h1>,
      <Panel
        isOpen={this.state.showPanel}
        type={PanelType.smallFixedNear}
        hasCloseButton={false}
        isLightDismiss={true}
        onDismiss={() => this.setState({ showPanel: false })}
      >
        <Nav
          selectedKey={this.props.activePage}
          groups={[
            {
              links: this.getPagesSmall(),
            },
          ]}
        />
      </Panel>,
    ];
  }

  getPagesRegular(): JSX.Element[] {
    return map(this.props.pages, (page: PageType) => {
      const props: {
        text: string,
        onClick: () => void,
        className: string,
        iconProps?: { iconName: string },
      } = {
        text: page.name,
        className: theme.button,
        onClick:  (): void => { this.changePage(page.key); },
      };
      if (this.props.activePage === page.key) {
        if (page.icon) {
          props['className'] = theme.activeIcon;
        } else {
          props['className'] = theme.active;
        }
      }
      if (page.icon) {
        props['text'] = '';
        props['iconProps'] = { iconName: page.icon };
      }
      return (
        <Button key={page.key}
          {...props}
        />
      );
    });
  }

  getRegularGui(): JSX.Element[] {
    return this.getPagesRegular();
  }

  renderUserMenu() {
    if (this.props.user) {
      return <UserMenu
      user={this.props.user}
      logout={this.props.logout} />;
    }
  }

  public render(): JSX.Element {
    let children: JSX.Element[] = null;
    if (!this.state.smallGui) {
      children = this.getRegularGui();
    } else {
      children = this.getSmallGui();
    }

    return(
      <Row className={classNames(theme.appBar)}>
        <Cell sm={9}>
          {children}
        </Cell>
        <Cell sm={3} className={classNames(theme.navBarPersona)}>
          {/*<Icon iconName="Ringer" />*/}
          {this.renderUserMenu()}
        </Cell>
      </Row>
    );
  }
}
