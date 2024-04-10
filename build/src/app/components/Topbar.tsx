import * as React from 'react';
import { observable, action } from 'mobx';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui-icons/Menu';

import {Component} from "../common/";

import * as banner from '../../../assets/images/banner.jpg';

const style = createStyleSheet('Topbar', (theme) => ({
  root: {
    backgroundImage: `url('${banner}')`,
    backgroundPosition: '0px -600px',
  },
}));

interface TopbarProps {
  setDrawer: (open: boolean) => void,
}

@withStyles(style)
export default class Topbar extends Component<TopbarProps & any, {}> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppBar elevation={0} classes={this.props.classes}>
        <Toolbar>
          {/*<IconButton onClick={()=>this.props.setDrawer(true)}>
            <IconMenu />
          </IconButton>*/}
          <Typography type="headline" className={this.props.classes.headline}>
            {'Crypto-currency balances'}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}