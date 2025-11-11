import { ViewItem } from '../../../../Base/ViewItem';
import { EpgModel } from '../../../../Controllers/Pages/HomeStack/IptvPage/EpgModel';
import { StyleSheet, View } from 'react-native';
import { CurrentEpgListView } from './CurrentEpgListView';

class EpgView extends ViewItem {
  get controller(): EpgModel {
    return this.props.controller;
  }

  render() {
    const { selectedItem } = this.controller;
    return <View style={styles.container}>{selectedItem && <CurrentEpgListView ref={selectedItem.epg.set} controller={selectedItem.epg} />}</View>;
  }
}

export { EpgView };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
