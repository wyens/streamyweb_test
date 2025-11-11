import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { WB } from '../../assets/styles/paddings';
import { ICONS } from '../../Constants/icons';
import { Button, styles } from './ButtonItem';
import { DraggablePan } from './DraggablePan';
import { Icon } from './Icon';
import { Text } from './TextItem';

class DragableButtonView extends Button {
  render() {
    const { style, type, onPress, icon, title, isSubmit, textColor } = this.props;
    const findStyle = style ? styles[style] : {};
    const findSection = type ? styles[type] : styles.main;
    const isSubmitStyle = isSubmit ? styles.isSubmit : {};
    return (
      <Pressable onPress={onPress} style={[dragableStyles.container, findSection, findStyle, isSubmitStyle]}>
        {icon && (
          <View style={dragableStyles.iconBox}>
            <DraggablePan>
              <Icon opacity={1} source={ICONS[icon]} style="button" />
            </DraggablePan>
          </View>
        )}
        <Text style={type ? type : 'main'} color={textColor}>
          {title}
        </Text>
      </Pressable>
    );
  }
}

export { DragableButtonView };

const dragableStyles = StyleSheet.create({
  container: {
    color: '#EEEEEE',
    borderRadius: 10,
    marginTop: WB,
    marginBottom: WB,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconBox: {
    position: 'absolute',
    left: WB,
    zIndex: 9999,
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
});
