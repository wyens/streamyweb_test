import React from 'react';
import { Animated, StyleSheet, TVFocusGuideView, View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { FocusScope } from './FocusScope.tsx';
import { gradientBottom, gradientTop } from '../../Constants/icons.ts';
import { ControllerLogout } from '../../Models/ControllerControlsVideo/ControllerLogout.ts';
import { LogoutMenuTV } from '../Components/LogoutMenuTV.tsx';

export class ViewLogoutApp extends ViewItem {
  get controller(): ControllerLogout {
    return this.props.controller;
  }

  render() {
    const { isVisible, onCancel, onConfirm } = this.controller;

    if(!isVisible){
      return false
    }
    return (
      <TVFocusGuideView isTVSelectable={isVisible} trapFocusDown trapFocusUp trapFocusRight trapFocusLeft pointerEvents={isVisible ? 'auto' : 'none'} style={[StyleSheet.absoluteFill, styles.layer]}>
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#000',
              opacity: isVisible ? this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25] }) : 0,
            },
          ]}
        />

        <Animated.Image source={gradientTop} style={[styles.topGradient, { opacity: this.controller.opacity }]} resizeMode="stretch" />
        <Animated.Image source={gradientBottom} style={[styles.bottomGradient, { opacity: this.controller.opacity }]} resizeMode="stretch" />

        <Animated.View style={[{ opacity: this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}>
          <FocusScope disabled={false}>
            <View style={[styles.wrapHeader]}>
              <LogoutMenuTV onCancel={onCancel} onConfirm={onConfirm} />
            </View>
          </FocusScope>
        </Animated.View>
      </TVFocusGuideView>
    );
  }
}

const styles = StyleSheet.create({
  layer: {
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 84,
    zIndex: 2,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 221,
    zIndex: 2,
  },
  overlay: {
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'flex-end',
  },
  wrapHeader: {
    width: '100%',
  },
});
