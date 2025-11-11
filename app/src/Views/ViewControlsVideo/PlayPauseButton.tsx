import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { PLAYERICONS } from '../../Constants/icons.ts';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { ControllerPlayPauseButton } from '../../Models/ControllerControlsVideo/ControllerPlayPauseButton.ts';

export class PlayPauseButton extends ViewItem {
  get controller(): ControllerPlayPauseButton {
    return this.props.controller;
  }

  render() {
    const { isPlaying, onPress, focused, setFocused } = this.controller;
    return (
      <Pressable
        ref={this.controller.ref}
        onPress={onPress}
        focusable={true}
        isTVSelectable={true}
        hasTVPreferredFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.button, focused && styles.focused]}
      >
        <Image source={!isPlaying ? PLAYERICONS.playMini : PLAYERICONS.pause} style={styles.icon} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: '#fff',
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
});
