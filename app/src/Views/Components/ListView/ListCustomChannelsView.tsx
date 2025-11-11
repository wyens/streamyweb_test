import React from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, TVFocusGuideView } from 'react-native';
import { ViewItem, viewItemProps } from '../../../Base/ViewItem';
import { ListScroll } from '../../../Models/List/ListScroll';
import { LOADERCOLOR } from '../../../assets/styles/colors';

type listScrollProps = viewItemProps & {
  focusable?: boolean;
  saveRef: (ref: any) => void;
  isFull?: boolean;
  LeftComponent: any;
  contentContainerStyle?:any
  autoFocus?: boolean;
};

class ListCustomChannelsView extends ViewItem {
  props: listScrollProps;
  constructor(props: listScrollProps) {
    super(props);
    this.props = props;
  }
  get controller(): ListScroll {
    return this.props.controller;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.controller.removeListeners();
  }

  setSaveScrollRef = (ref: any) => {
    this.props.saveRef(ref);
    this.controller.setScrollRef(ref);
  };

  render() {
    const { setScrollRef, scrollRefresh, onScroll, onScrollHorizontal, onLayout, horizontal, pagingEnabled } = this.controller;
    scrollRefresh.set(this);
    // @ts-ignore
    let contentContainerStyle = this.props.contentContainerStyle || {};
    let isFull = this.props.isFull ? styles.w100 : {};
    // console.log("FOCUSABLE", this.props.focusable)
    const { LeftComponent } = this.props
    return (
      <TVFocusGuideView style={styles.scroll} focusable={this.props.focusable} autoFocus={this.props.autoFocus}>
        <ScrollView
          ref={this.setSaveScrollRef}
          refreshControl={
            scrollRefresh.refreshing ? (
              <RefreshControl
                refreshing={scrollRefresh.refreshing}
                onRefresh={scrollRefresh.onRefresh}
                tintColor={LOADERCOLOR}
                colors={[LOADERCOLOR]}
              />
            ) : undefined
          }
          style={styles.scroll}
          contentContainerStyle={[contentContainerStyle]}
          onScroll={onScroll}
          scrollEventThrottle={20}
          onLayout={onLayout}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            {LeftComponent}
            <ScrollView horizontal contentContainerStyle={[isFull]} onScroll={onScrollHorizontal}>
              <View style={[isFull]}>{this.props.children}</View>
            </ScrollView>
          </View>
        </ScrollView>
      </TVFocusGuideView>
    );
  }
}

export { ListCustomChannelsView };

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  w100: {
    width: '100%',
  }
});
