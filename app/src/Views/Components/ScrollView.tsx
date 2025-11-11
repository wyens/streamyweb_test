import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { WB } from '../../assets/styles/paddings';
import { ViewItem } from '../../Base/ViewItem';
import { PageScroll } from '../../Models/PageScroll';
import { Text } from './TextItem';

type scrollProps = {
  component?: any;
  children?: any;
  RightComponent?: any;
  controller?: any;
  navigation?: any;
  padding?: boolean;
};

class Scroll extends ViewItem {
  props: scrollProps;
  constructor(props: scrollProps) {
    super(props);
    this.props = props;
  }
  get controller(): PageScroll {
    return this.props.controller;
  }
  render() {
    const { maxHeight, isKeyboard, setScrollRef, tryOnScroll, scrollEnabled } = this.controller;
    const maxHeightStyle = maxHeight === 0 ? {} : { maxHeight };
    // return <View style={styles.container}>{this.props.children}</View>
    const isOpenedKeyboard = isKeyboard ? styles.keyboardStyle : {};
    const paddingStyle = this.props.padding ? { paddingHorizontal: WB } : {};
    return <ScrollView ref={setScrollRef} scrollEnabled={scrollEnabled}  onScroll={tryOnScroll} scrollEventThrottle={5} style={[styles.container, maxHeightStyle, isOpenedKeyboard, paddingStyle]}>{this.props.children}</ScrollView>;
  }
}

export { Scroll };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  keyboardStyle: {
    // paddingBottom: 60,
  },
});
