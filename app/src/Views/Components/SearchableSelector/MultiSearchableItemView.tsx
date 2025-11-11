import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { inputBG } from '../../../assets/styles/colors';
import { WB } from '../../../assets/styles/paddings';
import { BASE_ICONS } from '../../../Constants/icons';
import { SearchableItem } from '../../../Models/SearchableSelector/SearchableItem';
import { ListItemView } from '../ListView/ListItemView';
import { SmallIcon } from '../SmallIcon';
import { Text } from '../TextItem';

class MultiSearchableItemView extends ListItemView {
  get controller(): SearchableItem {
    return this.props.controller;
  }

  render() {
    const { label, icon, onPressRemove, onPressSelect, selected } = this.controller;
    const selectedStyle = selected ? styles.selected : {};
    return (
      <View style={[styles.container, selectedStyle]}>
        <Pressable style={styles.touchable} onPress={onPressSelect}>
          {icon && (
            <View style={styles.iconBox}>
              <Image source={icon} style={styles.iconStyle} />
            </View>
          )}
          <Text style="boldText" customStyle={styles.text} numberOfLines={1}>
            {label}
          </Text>
          {selected && (
            <View style={[styles.unselectedBox]}>
              <SmallIcon source={BASE_ICONS.close} onPress={onPressRemove} style="sm" />
            </View>
          )}
        </Pressable>
      </View>
    );
  }
}

export { MultiSearchableItemView };

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },
  touchable: {
    paddingHorizontal: WB,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  iconStyle: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 40,
    height: 40,
  },
  iconBox: {
    width: '20%',
    maxWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    paddingLeft: WB,
    flex: 1,
  },
  unselectedBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  selected: {
    backgroundColor: inputBG,
  },
});
