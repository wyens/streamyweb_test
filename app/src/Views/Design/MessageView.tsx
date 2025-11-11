import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ALERTCOLORS, BORDERCOLOR } from '../../assets/styles/colors';
import { WM, WS } from '../../assets/styles/paddings';
import { ICONS } from '../../Constants/icons';
import { Text } from '../Components/TextItem';

type messageProps = {
  style: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  desctiption: string;
  visible?: boolean;
}
type messageState = {
  visible: boolean;
};

class MessageView extends React.Component {
  props: messageProps;
  state: messageState;
  constructor(props: messageProps) {
    super(props);
    this.props = props;
    this.state = {
      visible: props.visible || false,
    };
  }

  setVisible = (visible: boolean) => {
    this.setState({ visible });
  };

  hide = () => {
    this.setVisible(false);
  };
  show = () => {
    this.setVisible(true);
  };

  render() {
    const { title, desctiption, style } = this.props;
    const { visible } = this.state;
    const boxStyle = style ? styles[style] : {};
    const visibleStyle = visible ? styles.visible : styles.hidden;
    return (
      <View style={[styles.container, boxStyle, visibleStyle]}>
        <View style={styles.messageContainer}>
          {title && <Text style="alertTitle">{}</Text>}
          <Text style="alertMessage">{desctiption}</Text>
        </View>
        <Pressable style={styles.iconBox} onPress={this.hide}>
          <Image style={styles.icon} source={ICONS.cancel} />
        </Pressable>
      </View>
    );
  }
}

export { MessageView };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: BORDERCOLOR,
    borderRadius: 5,
    marginHorizontal: WS,
  },
  visible: {},
  hidden: {
    display: 'none',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: WM,
  },
  icon: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  iconBox: {
    width: 50,
    height: 50,
  },
  error: {
    backgroundColor: ALERTCOLORS.error,
  },
  success: {
    backgroundColor: ALERTCOLORS.success,
  },
  warning: {
    backgroundColor: ALERTCOLORS.warning,
  },
  info: {
    backgroundColor: ALERTCOLORS.info,
  },
})
