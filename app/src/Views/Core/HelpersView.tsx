import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { controllers } from '../../Controllers/Controllers';
import { ViewLogoutApp } from '../ViewControlsVideo/ViewLogoutApp';


class HelpersView extends ViewItem {
  render() {
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
