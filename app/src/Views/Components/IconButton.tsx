import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../../assets/styles/colors';
import { WB, WS } from '../../assets/styles/paddings';
import { BASE_ICONS } from '../../Constants/icons';
import { Text } from './TextItem';

type iconTypes = 'big'|'middle'|'small'|'extrasmall'|'flexsible'
type iconButtonProps = {
  source?: any;
  title?: string;
  infoString?: string;
  type: iconTypes;
  onPress?: () => void;
};

const getTitleDependsType = (type: iconTypes) => {
  switch (type) {
    case 'big':
      return 'h1';
    case 'middle':
      return 'h2';
    case 'small':
      return 'h3';
    case 'flexsible':
      return 'h3';
    case 'extrasmall':
      return undefined;
  }
};

class IconButton extends React.Component {
  props: iconButtonProps;
  constructor(props: iconButtonProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { type, onPress, source, title, infoString } = this.props;
    const typeStyle = type ? styles[type] : styles.big;
    const typeStyleBox = type ? styles[`${type}Box`] : {};
    return (
      <View style={[styles.container, typeStyle]}>
        <Pressable style={[styles.touchable, typeStyleBox]} onPress={onPress}>
          <View style={styles.iconBox}>
            <Image source={source || BASE_ICONS.noIcon} style={styles.icon} />
          </View>
          {title && (
            <View style={styles.textBox}>
              <Text style={getTitleDependsType(type)}>{title}</Text>
            </View>
          )}
        </Pressable>
      </View>
    );
  }
}

export { IconButton };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // backgroundColor: COLORS.inputBG,
    borderWidth: 1,
    borderColor: COLORS.BORDERCOLOR,
    borderRadius: 10,
    marginVertical: WS,
    flex: 1,
  },
  touchable: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // backgroundColor: "green",
  },
  icon: {
    maxWidth: 150,
    maxHeight: 150,
    // width: '100%'
  },
  iconBox: {},
  textBox: {
    // backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: WB,
    marginTop: WB,
  },
  big: {
    width: Dimensions.get('screen').width * 0.65,
    height: Dimensions.get('screen').width * 0.65,
    maxWidth: 300,
    maxHeight: 300,
  },
  bigBox: {},

  middle: {},
  middleBox: {},

  small: {
    width: 15,
    height: 15
  },
  smallBox: {

  },

  extrasmall: {
    width: 10,
    height: 10
  },
  extrasmallBox: {},

  flexsible: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  flexsibleBox: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
