import React from 'react';
import { StatusBar, View } from 'react-native';
import { mainBG } from '../../assets/styles/colors';
import { ViewItem } from '../../Base/ViewItem';
import { StatusBarController } from './StatusBar';
import { StatusHeight } from './MainMenuView';

class StatusBarView extends ViewItem {

  get controller(): StatusBarController {
    return this.props.controller
  }

  render() {
    const { hidden, inFullScreen } = this.controller
    return <View style={{height: StatusHeight, backgroundColor: inFullScreen ? "black" : mainBG}}>
      <StatusBar animated={false} barStyle={'light-content'} hidden={hidden} backgroundColor={mainBG} />
    </View>
  }
}

export { StatusBarView };
