import React from 'react';
import { View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem';
import { MainNavigation } from './MainNavigation';
import { controllers } from '../../Controllers/Controllers.ts';

class Core extends ViewItem {
  public async componentDidMount() {
    setTimeout(() => {
      controllers().appStateControls.startListening();
    }, 1000);
  }
  componentWillUnmount() {
    controllers().appStateControls.stopListening();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*<HelpersView />*/}
        <MainNavigation />
      </View>
    );
  }
}

export { Core };
