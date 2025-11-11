import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { TVInfoModel } from '../../Models/ControllerControlsVideo/TVInfoModel.ts';
import { COLORS } from '../../assets/styles/colors.ts';
import { FONTS } from '../../assets/styles/fonts.ts';
import { Text } from '../Components/TextItem.tsx';
import { LiveBadge } from './LiveBadge.tsx';

export class TVInfo extends ViewItem {
  get controller(): TVInfoModel {
    return this.props.controller;
  }

  render() {
    const { title, timeText, metaText, logoSource, live } = this.controller;

    return (
      <View style={[styles.card]}>
        {/* top row: logo + time */}
        <View style={styles.topRow}>
          {logoSource && <Image source={{ uri: logoSource }} style={styles.logo} />}
          {!!timeText && <Text stylesText={styles.timeText}>{timeText}</Text>}
        </View>

        {/* title */}
        {!!title && <Text stylesText={styles.title}>{title}</Text>}

        {/* bottom row: meta left + LIVE badge right */}
        <View style={styles.bottomRow}>
          {!!metaText && <Text stylesText={styles.meta}>{metaText}</Text>}

          {live && <LiveBadge />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    maxWidth: 900,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    // backgroundColor: 'rgba(0,0,0,0.12)',
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
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
    // tintColor: '#D9D9D9',
  },
  timeText: {
    color: COLORS.FONTCOLOR_WHITE,
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
    marginTop: 10,
  },
  meta: {
    color: COLORS.FONTCOLOR_GRAY,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },

  liveBadge: {
    paddingLeft: 15,
  },
});
