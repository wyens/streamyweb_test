import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WS } from '../../assets/styles/paddings';
import { BASE_ICONS } from '../../Constants/icons';
import { SmallIcon } from './SmallIcon';
import { Text } from './TextItem';

type modalSuitProps = {
  title?: string;
  hide: () => void;
};

class ModalHeader extends React.Component {
  props: modalSuitProps;
  constructor(props: modalSuitProps) {
    super(props);
    this.props = props;
  }

  render() {
    const { hide, title } = this.props;
    return (
      <View style={styles.modalHeader}>
        {title && (
          <Text style="h3" center>
            {title}
          </Text>
        )}
        <View style={styles.closeButtBox}>
          <SmallIcon onPress={hide} source={BASE_ICONS.back} style="back" />
        </View>
      </View>
    );
  }
}
export { ModalHeader };

const styles = StyleSheet.create({
  closeButtBox: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('screen').width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    paddingTop: WS,
    // backgroundColor: "red",
    height: Dimensions.get('screen').height * 0.07,
    justifyContent: 'center',
  },
})
