import React from 'react';
import { ViewItem } from '../../../../Base/ViewItem';
import { EpgList } from '../../../../Controllers/Pages/HomeStack/IptvPage/EpgList';
import { EPG_ITEM_HEIGHT, EpgItemView } from './EpgItemView';
import { TVStepScrollView } from '../../../ViewControlsVideo/EPGList/TVStepScrollView.tsx';

class CurrentEpgListView extends ViewItem {
  get controller(): EpgList {
    return this.props.controller;
  }
  componentDidMount(): void {
    this.controller.scrollToCurrentItem();
  }
  render() {
    const { items, setScrollRef } = this.controller;
    return (
      <View style={styles.container}>
        <TVStepScrollView
          itemHeight={EPG_ITEM_HEIGHT}
          paddingTop={0}
          enabled={true}
          scrollRef={setScrollRef}
          style={styles.scroll}
          contentContainerStyle={{ paddingVertical: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {items?.map((epg, i) => (
            <EpgItemView key={`${i}_${epg.timeCost}`} ref={epg.set} controller={epg} />
          ))}
        </TVStepScrollView>
      </View>
    );
  }
}

export { CurrentEpgListView };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});
