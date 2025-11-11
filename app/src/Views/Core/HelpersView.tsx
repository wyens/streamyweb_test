import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { controllers } from '../../Controllers/Controllers';
import { AlertView } from './AlertView';
import { MainLoaderView } from './MainLoaderView';
import { ResponseLoaderView } from './ResponseLoaderView';
import { View } from 'react-native';import { ViewLogoutApp } from '../ViewControlsVideo/ViewLogoutApp';
;

class HelpersView extends ViewItem {
  render() {
    const { loader, modals, responseLoader, alert, updateModule } = controllers();
    const { appLang, trailer } = modals;
    // return <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View>
    return (
      <>
        <ViewLogoutApp ref={controllers().main.mainListPage.controllerLogout.set} controller={controllers().main.mainListPage.controllerLogout} />
        {/* <AlertView ref={alert.set} controller={alert} /> */}
        {/* <MainLoaderView ref={loader.set} controller={loader} /> */}
        {/* <ResponseLoaderView ref={responseLoader.set} controller={responseLoader} /> */}
      </>
    );
  }
}

export { HelpersView };
