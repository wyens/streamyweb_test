import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { controllers } from '../../Controllers/Controllers.ts';
import { LoginPage } from '../../ViewsNew/LoginPage/LoginPage.tsx';

const LoginSwitch = createStackNavigator();

class LoginStackView extends ViewItem {
  render() {
    return (
      <LoginSwitch.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        initialRouteName="LoginPage"
      >
        <LoginSwitch.Screen name="LoginPage">
          {(props) => <LoginPage {...props} ref={controllers().main.loginPageModel.set} controller={controllers().main.loginPageModel} />}
        </LoginSwitch.Screen>
      </LoginSwitch.Navigator>
    );
  }
}

export { LoginStackView };
