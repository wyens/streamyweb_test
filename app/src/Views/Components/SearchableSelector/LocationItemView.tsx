import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import { COLORS } from '../../../assets/styles/colors';
import { WB } from '../../../assets/styles/paddings';
import { LocationItem } from '../../../Models/SearchableSelector/LocationItem';
import { ListItemView } from '../ListView/ListItemView';
import { Text } from '../TextItem';

class LocationItemView extends ListItemView {
  get controller(): LocationItem {
    return this.props.controller;
  }

  render() {
    const { makeName, icon, onPress, customType } = this.controller;
    const style = customType ? styles[customType] : {};
    const styleIcon = customType ? styles[`${customType}Icon`] : {};
    const styleBox = customType ? styles[`${customType}Box`] : {};
    return (
      <View style={[styles.container, style]}>
        <Pressable style={styles.touchable} onPress={onPress}>
          <View style={[styles.iconBox, styleBox]}>{icon && <Image source={icon} style={[styles.iconStyle, styleIcon]} />}</View>
          <Text style="descItem" customStyle={styles.text}>
            {makeName}
          </Text>
        </Pressable>
      </View>
    );
  }
}

export { LocationItemView };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WB,
    height: 50,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
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
    // fontSize: 18,
    paddingLeft: WB,
    // backgroundColor: "red",
    width: '90%',
  },
  current: {
    backgroundColor: COLORS.inputBG,
    height: 35,
  },
  currentIcon: {
    width: 17,
    height: 17,
  },
  currentBox: {
    // height: 40
  },
  no: {
    height: 35,
  },
  noIcon: {
    width: 17,
    height: 17,
  },
  noBox: {},
});
