import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import type {LoginPageModel} from "~/src/Controllers/Pages/NewScreens/LoginPageModel";
import {HeaderPage} from "~/src/Views/Components/HeaderPage/HeaderPage";
import {LoginMainView} from "~/src/Views/Components/LoginMainView/LoginMainView";

class LoginPage extends ViewItem {
  private focusListener: any;
  get controller(): LoginPageModel {
    return this.props.controller;
  }
  componentDidMount(): void {
      this.controller.init();
      console.log('componentDidMount')
  }
  componentWillUnmount(): void {
    this.controller.blur();
    this.focusListener?.();
  }
  render() {
    return (
      <div className={'screen_container'}>
        <HeaderPage />
        <LoginMainView ref={this.controller.loginMainModel.set} controller={this.controller.loginMainModel} />
      </div>
    );
  }
}

export { LoginPage };

