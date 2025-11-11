import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { VideoPlayerPage } from '../../ViewsNew/VideoPlayerPage/VideoPlayerPage.tsx';
import { controllers } from '../../Controllers/Controllers.ts';
import { MainListPage } from '../../ViewsNew/MainListPage/MainListPage.tsx';

const AuthSwitch = createStackNavigator();

class AuthStackView extends ViewItem {
  render() {
    return (
      <AuthSwitch.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        initialRouteName="MainListPage"
      >
        <AuthSwitch.Screen name="MainListPage">
          {(props) => <MainListPage {...props} ref={controllers().main.mainListPage.set} controller={controllers().main.mainListPage} />}
        </AuthSwitch.Screen>
        <AuthSwitch.Screen name="VideoPlayerPage">
          {(props) => <VideoPlayerPage {...props} ref={controllers().main.videoPlayerPage.set} controller={controllers().main.videoPlayerPage} />}
        </AuthSwitch.Screen>
      </AuthSwitch.Navigator>
    );
  }
}

export { AuthStackView };
