import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { UpdateComponent } from '../../Base/UpdateComponent';
import { AppSettings } from '../../Constants/AppSettings';
import { BASE_ICONS } from '../../Constants/icons';
import { controllers } from '../../Controllers/Controllers';
import { UPDATE } from '../../Helpers/constants';

type userphotoprops = {
  style?: 'big';
};

class UserPhotoView extends UpdateComponent {
  props: userphotoprops;
  constructor(props: userphotoprops) {
    super(props);
    this.props = props;
    this.type = UPDATE.USERINFO;
  }

  render() {
    const { style } = this.props;
    const containerStyle = style ? styles[style] : {};
    const imageStyle = style ? styles[`${style}Image`] : {};
    const source = controllers().auth.userPhoto;
    console.log('SOURCE', source);
    const path = AppSettings.endpoint + source;
    console.log('PATH', path);
    return (
      <View style={[styles.container, containerStyle]}>
        <Image source={source ? { width: 80, height: 80, uri: path } : BASE_ICONS.noPhoto} style={[styles.image, imageStyle]} />
      </View>
    );
  }
}

export { UserPhotoView };

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  big: {
    width: 55,
    height: 55,
  },
  bigImage: {
    width: 55,
    height: 55,
    resizeMode: 'stretch',
  },
});
