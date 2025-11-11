import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDERCOLOR, COLORS, inputBG } from '../../assets/styles/colors';
import { FONTS } from '../../assets/styles/fonts';
import { inputHeight, WS } from '../../assets/styles/paddings';

type multiInputBoxProps = {
  char: string;
  onPress: () => void;
};

class MultiInputBox extends React.Component {
  props: multiInputBoxProps;
  constructor(props: multiInputBoxProps) {
    super(props);
    this.props = props;
  }

  render() {
    const { char, onPress } = this.props;
    return (
      <View style={[styles.container]}>
        <Pressable style={styles.touchable} onPress={onPress}>
          <Text style={styles.text}>{char}</Text>
        </Pressable>
      </View>
    );
  }
}

export { MultiInputBox };

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: BORDERCOLOR,
    backgroundColor: inputBG,
    height: inputHeight,
    flex: 1,
    marginHorizontal: WS,
    borderRadius: 10,
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.FONTCOLOR,
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
});
