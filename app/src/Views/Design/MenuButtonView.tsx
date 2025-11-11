import React from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, View, Pressable } from 'react-native';
import { COLORS } from '../../assets/styles/colors';
import { menuHeight, menuIcon, menuIconMain, WM, WS } from '../../assets/styles/paddings';
import { MenuButton } from '../../Base/MenuButton';
import { ViewItem } from '../../Base/ViewItem';
import { Text } from '../Components/TextItem';
import { CounterView } from '../Components/Counter/CounterView';

type menuButtonState = {
  width: Animated.Value;
};

class MenuButtonView extends ViewItem {
  state: menuButtonState;
  constructor(props: any) {
    super(props);
    this.state = {
      width: new Animated.Value(0),
    };
  }
  open = () => {
    Animated.timing(this.state.width, {
      toValue: 100,
      useNativeDriver: false,
      duration: 100,
      easing: Easing.ease,
    }).start();
  };
  close = () => {
    Animated.timing(this.state.width, {
      toValue: 0,
      useNativeDriver: false,
      duration: 100,
      easing: Easing.ease,
    }).start();
  };

  get controller(): MenuButton {
    return this.props.controller;
  }

  render() {
    const { title, onClick, icon, selectedIcon, isSelected, customButton, counter, isCenter } = this.controller;
    const isSelectedStyle = isSelected ? styles.isSelected : {};
    const isSelectedTextStyle = isSelected ? styles.selectedText: {}

    const customStyle = customButton ? styles[customButton] : {};
    const customStyleBox = customButton ? styles[`${customButton}Box`] : {};
    const customStyleIcon = customButton ? styles[`${customButton}Image`] : {};
    const customStyleIconBox = customButton ? styles[`${customButton}ImageBox`] : {};

    const customSelectedStyle = customButton ? (isSelected ? styles[`${customButton}Selected`] : {}) : {};
    const customSelectedBoxStyle = customButton ? (isSelected ? styles[`${customButton}SelectedBox`] : {}) : {};
    return (
      <View style={[styles.container, customStyle, isSelectedStyle, customSelectedStyle]}>
        <Pressable style={[styles.touchable, customStyleBox, customSelectedBoxStyle]} onPress={onClick}>
          <Animated.View style={[styles.animaview, { width: this.state.width, height: this.state.width }]} />
          {icon && (
            <View style={[styles.iconBox, customStyleIconBox]}>
              <Image style={[styles.icon, customStyleIcon]} source={(selectedIcon && isSelected) ? selectedIcon : icon} />
            </View>
          )}
          {title && <Text style="menuText" customStyle={isSelectedTextStyle}>{title}</Text>}
        </Pressable>
        <CounterView styles={[styles.counterStyle, isCenter ? styles.counterStyleCenter : {}]} ref={counter.set} controller={counter} />
      </View>
    );
  }
}

export { MenuButtonView };

const styles = StyleSheet.create({
  animaview: {
    position: 'absolute',
    backgroundColor: '#2F8886',
    borderRadius: 100,
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: WS
  },
  iconBox: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: 10,
    minHeight: 10,
    width: menuIcon.w,
    height: menuIcon.h,
    padding: WS,
  },
  isSelected: {
    // backgroundColor: COLORS.MENUSELECTED,
    borderRadius: 10,
  },
  selectedText: {
    // color: "#2D3031"
    color: COLORS.MAIN_THEME_COLOR
  },
  transporterSelected: {
    backgroundColor: 'none',
  },
  transporterSelectedBox: {
    // backgroundColor: "#2F8886",
    borderColor: '#EEEEEE',
  },
  transporter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    minWidth: Dimensions.get('screen').width * 0.06,
    zIndex: 1010,
  },
  transporterBox: {
    borderRadius: 100,
    width: 90,
    height: 90,
    borderWidth: 7,
    // borderColor: '#2F8886',
    borderColor: '#FFF',
    zIndex: 1010,
    overflow: 'hidden',
    position: 'absolute',
  },
  transporterImage: {
    width: menuIconMain.w,
    height: menuIconMain.h,
    marginBottom: WM,
  },
  transporterImageBox: {
    width: '100%',
    marginLeft: 5,
  },
  leftopacity: {
  },
  leftopacityBox: {
    minWidth: Dimensions.get('screen').width * 0.3,
    paddingRight: menuHeight / 2,
    zIndex: 1009,
  },
  leftopacityImage: {},
  leftopacityImageBox: {},
  leftopacitySelected: {
    backgroundColor: 'none',
  },
  leftopacitySelectedBox: {
    borderRadius: 10,
  },

  rightopacity: {
    position: 'relative',
  },
  rightopacityBox: {
    zIndex: 1008,
    left: (-1 * Dimensions.get('screen').width) / 8,
    width: menuHeight * 1.7,
    paddingLeft: menuHeight / 2,
    height: menuHeight,
  },
  rightopacityImage: {},
  rightopacityImageBox: {},
  rightopacitySelected: {
    backgroundColor: 'none',
  },
  rightopacitySelectedBox: {
    borderRadius: 10,
    backgroundColor: COLORS.MENUSELECTED,
  },
  counterStyle: {
    top: -10,
    left: 0,
  },
  counterStyleCenter: {
    top: -30,
    left: 10,
  },
  // company
  
  series: {
    // flex: 20,
  },
  seriesBox: {},
  seriesSelected: {},
  seriesSelectedBox: {},
  seriesImage: {
    width: menuIcon.w+5, 
    height: menuIcon.h+5}
  ,
  seriesImageBox: {},
});
