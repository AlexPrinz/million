import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';





export default class Coffe extends React.Component {
  anchorEl;
  setAnchorEl;

  constructor(...args) {
    super(args);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    this.anchorEl = anchorEl;
    this.setAnchorEl = setAnchorEl;
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setAnchorEl(event.currentTarget);
  }

  handleClose = () => {
    this.setAnchorEl(null);
  }
  render() {
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          {'asdf'}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.anchorEl}
          keepMounted
          open={Boolean(this.anchorEl)}
          onClose={this.handleClose}
        >
          asf
        </Menu>
      </div>
    );
  }
}
