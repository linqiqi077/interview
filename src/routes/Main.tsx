import React, { Component, Fragment } from "react";
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import SiderBar from '../components/layout/SiderBar';
import Question from '../pages/Questions/Index';

export default class Main extends Component {

  getComponent = () => {
    return (
      <Switch>
        <Route exact path="/" component={Question} />
      </Switch>
    )
  }
  render() {
    return (
      <SiderBar contentComponent={this.getComponent()}></SiderBar>

    )
  }
}
