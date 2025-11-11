import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';

type smallIconsProps = {
  onPress?: () => void;
  source: any;
  style?: 'sm' | 'md' | 'lg' | 'back';
};

class SmallIcon extends React.Component {
  props: smallIconsProps;
  constructor(props: smallIconsProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { onPress, source, style } = this.props;
    const customStyle = style ? styles[style] : {};
    const customStyleBox = style ? styles[`${style}Box`] : {};
    return (
      <Pressable style={[styles.iconBox, customStyleBox]} onPress={onPress}>
        <Image style={[styles.icon, customStyle]} source={source} />
      </Pressable>
    );
  }
}

export { SmallIcon };

const styles = StyleSheet.create({
  iconBox: {
    width: 50,
    height: 50,
  },
  icon: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  back: {
    width: 25,
    height: 25,
  },
  backBox: {
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').height * 0.07,
    // backgroundColor: "green",
    justifyContent: 'center',
  },
  sm: {},
  smBox: {
    width: 25,
    height: 25,
  },
  md: {},
  mdBox: {
    width: 40,
    height: 40,
  },
  lg: {},
  lgBox: {
    width: 60,
    height: 60,
  },
})
