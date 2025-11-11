import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { BASE_ICONS } from '../../Constants/icons.ts';
import { Text } from '../Components/TextItem.tsx';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { TVHeaderModel } from '../../Models/ControllerControlsVideo/TVHeaderModel.ts';

export class VideoHeader extends ViewItem {
  get controller(): TVHeaderModel {
    return this.props.controller;
  }
  render() {
    const { onPress, setFocused, focused, title } = this.controller;
    return (
      <Pressable
        onPress={onPress}
        focusable={true}
        isTVSelectable={true}
        hasTVPreferredFocus={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.wrap, focused && styles.backButtonFocused]}
      >
        <View style={[styles.backButton]}>
          <Image source={BASE_ICONS.back} style={styles.backIcon} />
        </View>

        {!!title && (
          <Text numberOfLines={1} stylesText={styles.title}>
            {title}
          </Text>
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
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
  backIcon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  backText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28,
  },
  title: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
  },
});
