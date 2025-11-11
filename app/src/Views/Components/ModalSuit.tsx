import React from 'react';
import { Dimensions, Modal, Platform, StyleSheet, View } from 'react-native';
import { mainBG } from '../../assets/styles/colors';
import { WS, XB } from '../../assets/styles/paddings';
import { ModalHeader } from './ModalHeader';

type modalSuitProps = {
  children?: any;
  visible: boolean;
  title?: string;
  hide: () => void;
  hideModalHeader?: boolean;
};

class ModalSuit extends React.Component {
  props: modalSuitProps;
  constructor(props: modalSuitProps) {
    super(props);
    this.props = props;
  }

  render() {
    const { children, visible, hide, title, hideModalHeader } = this.props;
    // console.error("HERE IS ME", Dimensions.get('screen').width)
    return (
      <Modal animationType="slide" visible={visible} onRequestClose={hide}>
        <View style={styles.container}>
          {!hideModalHeader && <ModalHeader title={title} hide={hide} />}
          {children}
        </View>
      </Modal>
    );
  }
}
export { ModalSuit };

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainBG,
    paddingTop: Platform.OS === 'android' ? 0 : XB,
    flex: 1,
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
    // backgroundColor: "red"
  },
  closeButtBox: {
    // alignItems: "flex-end",
    position: 'absolute',
    left: WS,
    top: WS,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red"
  },
  modalHeader: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    width: '100%',
    paddingTop: WS,
  },
});
