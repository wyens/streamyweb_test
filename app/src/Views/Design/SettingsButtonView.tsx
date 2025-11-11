import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../../assets/styles/colors';
import { WB } from '../../assets/styles/paddings';
import { INPUT_ICONS } from '../../Constants/icons';
import { Text } from '../Components/TextItem';

type settingButtonProps = {
  onPress: () => void;
  title: string;
  value?: string;
  containerStyles?: any;
  iconStyles?: any;
};

class SettingsButtonView extends React.Component {
  props: settingButtonProps;
  constructor(props: settingButtonProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { onPress, title, value, containerStyles, iconStyles } = this.props;
    return (
      <View style={[styles.container, containerStyles]}>
        <Pressable style={styles.touchable} onPress={onPress}>
          <View style={styles.texts}>
            <Text style="settingText">{title}</Text>
            {value ? <Text style="settingTextHolded">{value}</Text> : null}
          </View>
          <Image source={INPUT_ICONS.right} style={[styles.icon, iconStyles]} />
        </Pressable>
      </View>
    );
  }
}

export { SettingsButtonView };

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.RIDE_SHINE,
    borderTopWidth: 1,
    borderColor: COLORS.RIDE_BORDER_SHINE,
  },
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingLeft: WB,
  },
  icon: {
    width: 50,
    height: 50,
  },
})
