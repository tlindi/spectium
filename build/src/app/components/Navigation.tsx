import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

import { RouterStore } from './../stores/';
import { STORE_ROUTER } from './../constants/';
import {Component} from "../common/";

const style = createStyleSheet('Navigation', (theme) => ({
}));

@withStyles(style)
@inject(STORE_ROUTER)
@observer
export default class Navigation extends Component<{}, {}> {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.TouchEvent<Element>) {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const path = event.currentTarget.getAttribute('value');
    router.push(path);
  }

  render() {
    return (<List>
        <ListItem button onClick={this.handleClick} value={''}><ListItemText primary="Home" /></ListItem>
      </List>);
  }

}
