import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { MainListPageModel } from '../../Controllers/Pages/NewScreens/MainListPageModel';

class MainListPage extends ViewItem {
  private focusUnsub: any;
  get controller(): MainListPageModel {
    return this.props.controller;
  }
  componentDidMount(): void {
    this.controller.init();
  }

  componentWillUnmount(): void {
    this.controller.blur();
    this.focusUnsub?.();
  }

  render() {
    const { categories, iptvPage, headerRef, controllerLogout } = this.controller;
    return (
        <div className={'screen_container'}>
        {/*<HeaderPageWithName ref={headerRef} controller={controllerLogout} />*/}
        {/*<MainCategoriesView ref={categories.set} controller={categories} />*/}
        {/*<IptvListPageView ref={iptvPage.set} controller={iptvPage} />*/}
      </div>
    );
  }
}

export { MainListPage };

