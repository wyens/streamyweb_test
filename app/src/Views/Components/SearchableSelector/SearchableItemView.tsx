import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { WB } from '../../../assets/styles/paddings';
import { SearchableItem } from '../../../Models/SearchableSelector/SearchableItem';
import { ListItemView } from '../ListView/ListItemView';
import { Text } from '../TextItem';

class SearchableItemView extends ListItemView {
  get controller(): SearchableItem {
    return this.props.controller;
  }

  render() {
    const { label, icon, onPress } = this.controller;
    return (
      <View style={styles.container}>
        <Pressable style={styles.touchable} onPress={onPress}>
          <View style={styles.iconBox}>{icon && <Image source={icon} style={styles.iconStyle} />}</View>
          <Text style="boldText" customStyle={styles.text}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
}

export { SearchableItemView };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WB,
    height: 50,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
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
  },
});
