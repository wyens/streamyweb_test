import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { WS } from '../../assets/styles/paddings';
import { UpdateComponent } from '../../Base/UpdateComponent';
import { BASE_ICONS, TRANSPORTER_ICONS } from '../../Constants/icons';
import { controllers } from '../../Controllers/Controllers';
import { UPDATE } from '../../Helpers/constants';
import { Text } from '../Components/TextItem';

type userphotoprops = {
  style?: 'default';
};

class UserStatsView extends UpdateComponent {
  props: userphotoprops;
  constructor(props: userphotoprops) {
    super(props);
    this.props = props;
    this.type = UPDATE.USERINFO;
  }

  render() {
    const { style } = this.props;
    const containerStyle = style ? styles[style] : {};
    // const imageStyle = style ? styles[`${style}Image`] : {}
    const { userInfo } = controllers().auth;
    if (userInfo === null) {
      return null;
    }
    const { rating, earned, rides } = userInfo;
    return (
      <View style={[styles.container, containerStyle]}>
        {/*<View style={[styles.statBox]}>*/}
        {/*  /!*<Image source={TRANSPORTER_ICONS.stars} style={styles.statIcon}/>*!/*/}
        {/*  /!*<Text style="boldText">{rating}</Text>*!/*/}
        {/*</View>*/}
        <View style={[styles.statBox]}>
          <Image source={TRANSPORTER_ICONS.rides} style={[styles.statIcon]} />
          <Text style="boldText">{rides}</Text>
        </View>
        <View style={styles.statBox}>
          <Image source={TRANSPORTER_ICONS.earned} style={styles.statIcon} />
          <Text style="boldText">{earned}</Text>
        </View>
      </View>
    );
  }
}

export { UserStatsView };

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    maxHeight: '100%',
    flexDirection: 'row',
  },
  default: {},
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statIcon: {
    width: 20,
    height: 20,
    marginHorizontal: WS,
  },
});
