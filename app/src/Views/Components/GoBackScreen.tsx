import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { BASE_ICONS } from '../../Constants/icons';

type goBackScreenProps = {
  onPress?: () => void;
  roundBoxStyle?: boolean
};

class GoBackScreen extends React.Component {
  props: goBackScreenProps;
  constructor(props: goBackScreenProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { onPress, roundBoxStyle } = this.props;
    const roundBox = roundBoxStyle ? styles.boxBG : {}
    return (
      <Pressable hitSlop={50} style={[styles.container]} onPress={onPress}>
        <View style={[styles.roundBox, roundBox]}>
          <Image style={[styles.image]} source={BASE_ICONS.back} />
        </View>
      </Pressable>
    );
  }
}

export { GoBackScreen };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    width: 40,
    alignItems: 'center',
    zIndex: 99999
    // backgroundColor: "red"
  },
  roundBox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingRight: 2
  },
  boxBG: {
    backgroundColor: "rgba(0,0,0,.4)",
  },
  image: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
});
