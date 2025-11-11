import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';

type iconProps = {
  source: any;
  style?: 'button' | 'input' | 'leftInput' | 'selectorItem';
  onPress?: () => void;
  customStyle?: any;
  customImgStyle?: any;
  opacity?: number;
};

class FastImageComponent extends React.Component {
  props: iconProps;
  constructor(props: iconProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { style, source, onPress, customStyle, customImgStyle } = this.props;
    const findstyle = style ? styles[style] : {};
    const findstyleBox = style ? styles[`${style}Box`] : {};
    console.log('source', source);
    return (
      <View style={[styles.iconBox, findstyleBox, customStyle]}>
        <Pressable style={[styles.touchable]} onPress={onPress}>
          <FastImage style={(styles.icon, findstyle, customImgStyle)} source={source} resizeMode={FastImage.resizeMode.contain} />
        </Pressable>
      </View>
    );
  }
}

export { FastImageComponent };

const styles = StyleSheet.create({
  iconBox: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: '15%',
    minWidth: 20,
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  button: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttonBox: {
    left: 0,
  },
  input: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 25,
    height: 25,
  },
  inputBox: {
    right: 0,
    maxWidth: 30,
  },
  selectorItem: {},
  selectorItemBox: {},
  leftInput: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 17,
    height: 17,
  },
  leftInputBox: {
    left: 3,
    maxWidth: 25,
  },
});
