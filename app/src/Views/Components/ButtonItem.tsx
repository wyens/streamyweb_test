import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { buttonHeight, WB, XXB } from '../../assets/styles/paddings';
import { ICONS } from '../../Constants/icons';
import { Icon } from './Icon';
import { Text } from './TextItem';
import { COLORS } from '../../assets/styles/colors';

export type buttonItemProps = {
  onPress: () => void;
  title: string;
  style?: 'suit' | 'done' | 'confirm' | 'cancel' | 'info' | 'simple' | 'purple' | 'google';
  type?: 'main' | 'secondary' | 'smallButton';
  icon?: 'next' | 'cancel' | 'confirm' | 'done' | 'info' | 'reload' | 'google';
  customText?: any;
  textColor?: string;
  loading?: boolean;
  isSubmit?: boolean;
  customStyle?: any;
};
class Button extends React.Component {
  props: buttonItemProps;
  constructor(props: buttonItemProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { style, type, onPress, icon, title, isSubmit, textColor, customText} = this.props;
    const findStyle = style ? styles[style] : {};
    const findSection = type ? styles[type] : styles['main'];
    const isSubmitStyle = isSubmit ? styles.isSubmit : {};
    const customStyle = this.props.customStyle || {};
    return (
      <Pressable onPress={onPress} style={[styles.container, findSection, findStyle, isSubmitStyle, customStyle]}>
        {icon && <Icon onPress={onPress} source={ICONS[icon]} style="button" />}
        <Text style={type ? type : 'main'} customStyle={customText} color={textColor}>
          {title}
        </Text>
      </Pressable>
    );
  }
}

export { Button };

export const styles = StyleSheet.create({
  container: {
    color: '#EEEEEE',
    borderRadius: 10,
    marginTop: WB,
    marginBottom: WB,
    position: 'relative',
  },
  iconBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    width: '15%',
  },
  icon: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  smallButton: {
    marginTop: 0,
    marginBottom: 0,
  },
  main: {
    height: buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  suit: {
    backgroundColor: COLORS.MAIN_THEME_COLOR,
  },
  done: {
    backgroundColor: '#84C69B',
  },
  confirm: {
    backgroundColor: '#F9CE00',
  },
  cancel: {
    backgroundColor: '#FF5722',
  },
  info: {
    backgroundColor: '#09194F',
  },
  purple: {
    backgroundColor: '#818CB0',
  },
  simple: {},
  isSubmit: {
    marginBottom: XXB,
  },
  google: {
    backgroundColor: "#fff"
  }
})
