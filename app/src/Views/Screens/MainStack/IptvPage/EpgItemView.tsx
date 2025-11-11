import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViewItem } from '../../../../Base/ViewItem';
import { EpgItem } from '../../../../Controllers/Pages/HomeStack/IptvPage/EpgItem';
import { WB, WM } from '../../../../assets/styles/paddings';
import { FONTS } from '../../../../assets/styles/fonts';
import { COLORS } from '../../../../assets/styles/colors';
import { Text } from '../../../Components/TextItem.tsx';

export const EPG_ITEM_HEIGHT = 46;

class EpgItemView extends ViewItem {
  get controller(): EpgItem {
    return this.props.controller;
  }

  render() {
    const { betweens, name, selected, disabled } = this.controller;
    const disabledStyle = disabled ? styles.disabled : null;

    return (
      <View style={styles.container}>
        {selected && <View pointerEvents="none" style={styles.selectedBg} />}
        {selected && <View pointerEvents="none" style={styles.selectedStroke} />}

        <Text stylesText={[styles.time, disabledStyle]}>{betweens}</Text>
        <Text stylesText={[styles.name, disabledStyle]} numberOfLines={1}>
          {name}
        </Text>
      </View>
    );
  }
}

export { EpgItemView };

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: EPG_ITEM_HEIGHT,
    paddingHorizontal: WB,
    borderRadius: 28,
    overflow: 'hidden',
  },

  selectedBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 28,
  },

  selectedStroke: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: COLORS.FONTCOLOR_WHITE,
    borderRadius: 28,
  },

  disabled: { color: 'hsl(0,0%,55%)' },

  time: {
    width: 140,
    marginRight: WM,
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.FONTCOLOR_WHITE,
  },

  name: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.FONTCOLOR,
  },
});
