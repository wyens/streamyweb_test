import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';

type iconProps = {
  source: any;
  style?: 'button' | 'input' | 'leftInput' | 'selectorItem';
  onPress?: () => void;
  customStyle?: any;
  customImgStyle?: any;
  opacity?: number;
};

class Icon extends React.Component {
  props: iconProps;
  constructor(props: iconProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { style, source, onPress, customStyle, opacity, customImgStyle } = this.props;
    const findstyle = style ? styles[style] : {};
    const findstyleBox = style ? styles[`${style}Box`] : {};
    return (
      <View style={[styles.iconBox, findstyleBox, customStyle]}>
        <Pressable style={styles.touchable} onPress={onPress}>
          <Image style={[styles.icon, findstyle, customImgStyle]} source={source} />
        </Pressable>
      </View>
    );
  }
}

export { Icon };

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
    maxWidth: '100%',
    maxHeight: '100%',
  },
  button: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 30,
    height: 30
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
