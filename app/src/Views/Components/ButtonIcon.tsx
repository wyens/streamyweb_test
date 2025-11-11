import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

type chooseTripButtonProps = {
  onPress: () => void;
  image: any;
};

class ButtonIcon extends React.Component {
  props: chooseTripButtonProps;
  constructor(props: chooseTripButtonProps) {
    super(props);
    this.props = props;
  }
  onPress = () => {
    this.props.onPress && this.props.onPress();
  };
  render() {
    const { onPress, image } = this.props;

    return (
      <Pressable onPress={onPress} style={styles.wrap}>
        <Image source={image} style={styles.img} />
      </Pressable>
    );
  }
}

export { ButtonIcon };

const styles = StyleSheet.create({
  wrap: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#636363',
  },
  img: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
