import React from 'react';
import { RefreshControl } from 'react-native';
import { LOADERCOLOR } from '../../../assets/styles/colors';
import { ViewItem } from '../../../Base/ViewItem';
import { ScrollRefresh } from '../../../Models/List/ScrollRefresh';

class ScrollRefreshView extends ViewItem {
  get controller(): ScrollRefresh {
    return this.props.controller;
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { refreshing, onRefresh } = this.controller;
    return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[LOADERCOLOR, 'red']} />;
  }
}

export { ScrollRefreshView };
