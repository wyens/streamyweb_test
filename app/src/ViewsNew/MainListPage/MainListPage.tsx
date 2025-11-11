import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { MainListPageModel } from '../../Controllers/Pages/NewScreens/MainListPageModel';
import {appNavigator} from "~/src/Controllers/Navigation";

class MainListPage extends ViewItem {
  private focusUnsub: any;
  get controller(): MainListPageModel {
    return this.props.controller;
  }
  componentDidMount(): void {
    this.controller.init();

    setTimeout(() => {
        appNavigator().goToVideoPlayerPage({})
    }, 3000)
  }

  componentWillUnmount(): void {
    this.controller.blur();
    this.focusUnsub?.();
  }

  render() {
    const { categories, iptvPage, headerRef, controllerLogout } = this.controller;
    return (
        <div className={'screen_container'}>
            MainListPage
        {/*<HeaderPageWithName ref={headerRef} controller={controllerLogout} />*/}
        {/*<MainCategoriesView ref={categories.set} controller={categories} />*/}
        {/*<IptvListPageView ref={iptvPage.set} controller={iptvPage} />*/}
      </div>
    );
  }
}

export { MainListPage };

