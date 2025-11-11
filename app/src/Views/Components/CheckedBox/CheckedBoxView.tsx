import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ViewItem, viewItemProps } from '../../../Base/ViewItem';
import { CheckedBoxModel } from '../../../Models/CheckedBoxModel/CheckedBoxModel';
import { COLORS } from '../../../assets/styles/colors';
import { ICONS } from '../../../Constants/icons';

type checkedBoxViewProps = viewItemProps & {
  imageStyle?: any;
  container?: any;
};
class CheckedBoxView extends ViewItem {
  props: checkedBoxViewProps;
  constructor(props: checkedBoxViewProps) {
    super(props);
    this.props = props;
  }
  get controller(): CheckedBoxModel {
    return this.props.controller;
  }
  renderChecked() {
    const { container, imageStyle } = this.props;
    return (
      <View style={[styles.wrapChecked, container]}>
        <Image source={ICONS.checked} style={[styles.image15, imageStyle]} />
      </View>
    );
  }
  renderUnChecked() {
    const { container } = this.props;
    return <View style={[styles.wrapChecked, styles.wrapUnChecked, container]} />;
  }
  render() {
    const { onPress, isChecked } = this.controller;
    const { container } = this.props;
    return (
      <Pressable style={[styles.container, container]} onPress={onPress}>
        {isChecked ? this.renderChecked() : this.renderUnChecked()}
      </Pressable>
    );
  }
}

export { CheckedBoxView };

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
  },
  wrapChecked: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#2F8886',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapUnChecked: {
    backgroundColor: 'transparent',
    borderColor: COLORS.WHITE,
  },
  image15: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
  },
});
