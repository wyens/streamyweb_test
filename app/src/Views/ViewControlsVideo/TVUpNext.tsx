import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { COLORS } from '../../assets/styles/colors.ts';
import { FONTS } from '../../assets/styles/fonts.ts';
import { Text } from '../Components/TextItem.tsx';
import { TVUpNextModel } from '../../Models/ControllerControlsVideo/TVUpNextModel.ts';
import { BASE_ICONS } from '../../Constants/icons.ts';

export class TVUpNext extends ViewItem {
  get controller(): TVUpNextModel {
    return this.props.controller;
  }

  render() {
    const { onPress, setFocused, focused, title, metaText } = this.controller;

    if(!title){
      return null
    }
    
    return (
      <Pressable
        onPress={onPress}
        focusable
        isTVSelectable
        hasTVPreferredFocus={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.card, focused && styles.cardFocused]}
      >
        <View style={{ flex: 1 }}>
          {/* top row */}
          <View style={styles.topRow}>
            <Text stylesText={styles.upNextText}>Következik</Text>
          </View>

          {/* title */}
          {!!title && <Text stylesText={styles.title}>{title}</Text>}

          {/* bottom row: meta left*/}
          <View style={styles.bottomRow}>{!!metaText && <Text stylesText={styles.meta}>{metaText}</Text>}</View>
        </View>
        <View>
          <Image source={BASE_ICONS.right} style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]} />
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 10,
    width: '100%',
    maxWidth: 900,
    minWidth: 266,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFocused: {
    borderColor: '#ffffff',
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoLive: {
    width: 51,
    height: 21,
    resizeMode: 'contain',
  },
  logo: {
    width: 51,
    height: 21,
    resizeMode: 'contain',
    marginRight: 15,
  },
  upNextText: {
    color: COLORS.FONTCOLOR_GRAY,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },

  title: {
    color: COLORS.FONTCOLOR_WHITE,
    fontSize: 18,
    fontFamily: FONTS.bold,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  meta: {
    color: COLORS.FONTCOLOR_GRAY,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  arrowIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
