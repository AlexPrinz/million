import { COLORS } from '@/constants';
import { IUser } from '@/models/User';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { createRef } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import * as theme from './theme.scss';

interface IUserMenuProps {
  user: IUser;
  logout: () => void;
}

interface IUserMenuState {
  showUserMenu?: boolean;
}

export default class UserMenu extends React.Component<IUserMenuProps, IUserMenuState> {

  private _personaIconElement = createRef<HTMLElement>();

  public constructor(props: IUserMenuProps) {
    super(props);

    this.state = {
      showUserMenu: false,
    };
  }

  public render(): JSX.Element {
    // tslint:disable-next-line
    const imageUrl = `https://secure.gravatar.com/avatar`;

    return(
      <div className={theme.personaIcon}>
        <div ref={this._personaIconElement}>
          <Persona
            onClick={this._toggleUserMenu}
            text={this.props.user.name}
            imageInitials={this.props.user.initials}
            secondaryText={this.props.user.userId}
            hidePersonaDetails={true}
            size={PersonaSize.size32}
            initialsColor={PersonaInitialsColor.lightBlue}
            imageUrl={imageUrl}
          />
        </div>
        <Callout
          className={theme.msCallout}
          backgroundColor={COLORS.NEUTRAL_LIGHT}
          isBeakVisible={true}
          beakWidth={10}
          target={this._personaIconElement.value}
          onDismiss={this._onUserMenuDismiss}
          setInitialFocus={true}
          hidden={!this.state.showUserMenu}
          directionalHint={DirectionalHint.bottomRightEdge}
        >
          <ul className={theme.personaSubmenu} >
            <li>
              <Persona
                text={this.props.user.name}
                imageInitials={this.props.user.initials}
                secondaryText={this.props.user.userId}
                hidePersonaDetails={false}
                size={PersonaSize.size48}
                initialsColor={PersonaInitialsColor.lightBlue}
                imageUrl={imageUrl}
              />
            </li>
            {/*<li>
              <DefaultButton
                iconProps={{ iconName: 'Settings' }}
                allowDisabledFocus={true}
                text="User Settings"
                onClick={() => { return; }}
              />
            </li>*/}
            <li>
              <DefaultButton
                iconProps={{ iconName: 'SignOut' }}
                allowDisabledFocus={true}
                text="Logout"
                onClick={() => { this.props.logout(); }}
              />
            </li>
          </ul>
        </Callout>
      </div>
    );
  }

  private _toggleUserMenu = (): void => {
    this.setState({
      showUserMenu: !this.state.showUserMenu,
    });
  }

  private _onUserMenuDismiss = (): void => {
    this.setState({
      showUserMenu: false,
    });
  }

}
