import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ICONS } from '../../Constants/icons.ts';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { TVFavoriteModel } from '../../Models/ControllerControlsVideo/TVFavoriteModel.ts';

export class VideoFavorite extends ViewItem {
  get controller(): TVFavoriteModel {
    return this.props.controller;
  }
  render() {
    const { toggleFavorite, setFocused, focused, isFavorite } = this.controller;
    return (
      <Pressable
        onPress={toggleFavorite}
        focusable={true}
        isTVSelectable={true}
        hasTVPreferredFocus={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.wrap, focused && styles.backButtonFocused]}
      >
        <View style={[styles.backButton]}>
          <Image source={isFavorite ? ICONS.starActive : ICONS.starDefault} style={[styles.icon, isFavorite && styles.activeIcon]} />
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonFocused: {
    borderColor: '#fff',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
  activeIcon: {
    tintColor: '#196FFD',
  },
});
