import React from 'react';
import { UpdateComponent } from '../../Base/UpdateComponent';
import { UPDATE } from '../../Helpers/constants';
import { AuthStackView } from './AuthStackView';
import { LoginStackView } from './LoginStackView.tsx';
import { controllers } from '../../Controllers/Controllers.ts';

class SwitchStackView extends UpdateComponent {
  constructor(props: any) {
    super(props);
    this.type = UPDATE.AUTH;
  }

  render() {
    const { isLogin } = controllers().auth;
    // console.error("IS LOGIN", isLogin)
    // return !isLogin ? <AuthStackView /> : <MainStackView />;
    // let isLogin = true;
    console.log('!isLogin', !isLogin)
    if (!isLogin) {
      return <LoginStackView />;
    }
    return <AuthStackView />;
  }
}

export { SwitchStackView };
