import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem';
import { MainListPageModel } from '../../Controllers/Pages/NewScreens/MainListPageModel';
import { MainCategoriesView } from './Components/Categories/MainCategories.tsx';
import { mainBG } from '../../assets/styles/colors.ts';
import { IptvListPageView } from './Components/Iptvs/IptvListPageView.tsx';
import { HeaderPageWithName } from '../../Views/Components/HeaderPage/HeaderPageWithName.tsx';
import { controllers } from '../../Controllers/Controllers.ts';

class MainListPage extends ViewItem {
  private focusUnsub: any;
  get controller(): MainListPageModel {
    return this.props.controller;
  }
  componentDidMount(): void {
    this.controller.init();
    this.focusUnsub = this.props.navigation.addListener('focus', () => {
      controllers().remoteControls.setOnRemoteEvent(this.controller.RemoteEvent);
    });
  }

  componentWillUnmount(): void {
    this.controller.blur();
    this.focusUnsub?.();
  }

  render() {
    const { categories, iptvPage, headerRef, controllerLogout } = this.controller;
    return (
      <View style={styles.container}>
        <HeaderPageWithName ref={headerRef} controller={controllerLogout} />
        <MainCategoriesView ref={categories.set} controller={categories} />
        <IptvListPageView ref={iptvPage.set} controller={iptvPage} />
      </View>
    );
  }
}

export { MainListPage };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainBG,
  },
});
