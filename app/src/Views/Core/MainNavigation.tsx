import React from 'react';
import { View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem';
import { NavigationContainer } from '@react-navigation/native';
import { navigator } from '../../Controllers/Navigation';
import { SwitchStackView } from '../Navigations/SwitchStackView';

class MainNavigation extends ViewItem {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer ref={navigator().set}>
          <SwitchStackView />
        </NavigationContainer>
      </View>
    );
  }
}

export { MainNavigation };
