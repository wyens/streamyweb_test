import React from 'react';
import { Animated, Button, StyleSheet, TVFocusGuideView, View } from 'react-native';
import { ViewItem } from '../../../Base/ViewItem.tsx';
import { ControllerChannelList } from '../../../Models/ControllerControlsVideo/ChannelList/ControllerChannelList.ts';
import { ListView } from '../../Components/ListView/ListView.tsx';
import { NewIptvRowView } from '../../../ViewsNew/MainListPage/Components/Iptvs/NewIptvRowView.tsx';
import { ChannelFilters } from './ChannelFilters.tsx';
import { controllers } from '../../../Controllers/Controllers.ts';
import { RemoteEventType } from '../../../Base/RemoteControls.ts';

export class ChannelList extends ViewItem {
  get controller(): ControllerChannelList {
    return this.props.controller;
  }

  render() {
    const isVisible = this.controller.isVisible;
    const pointerEvents = isVisible ? 'auto' : 'none';
    // const destinations = this.controller.iptvList.localitems[0] ? [this.controller.iptvList.localitems[0].focusRefItem] : undefined
    // console.error("destinations", destinations)
    if(!isVisible){
      return null
    }
    return (
      <Animated.View
        ref={this.controller.set}
        // pointerEvents={pointerEvents}
        style={[StyleSheet.absoluteFill, styles.overlay, { opacity: this.controller.opacity }]}
      >
        {/* <Button title='reset' onPress={()=>controllers().main.videoPlayerPage.RemoteEvent(RemoteEventType.Back)}/> */}
        <TVFocusGuideView isTVSelectable={true} style={styles.panel}>
          <ChannelFilters ref={this.controller.setCategoryFocusRef} selectedCategory={this.controller.selectedCategory}  onSelectCategory={this.controller.onCategoryChanged} selectedChannel={controllers().main.videoPlayerPage.initialChannel?.title || ""} categories={controllers().main.mainListPage.categories.items}/>
          <ListView isFull={true} autoFocus={true} ref={this.controller.iptvList.set} controller={this.controller.iptvList} RightComponent={NewIptvRowView} />
        </TVFocusGuideView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'flex-end',
  },
  panel: {
    width: '100%',
    height: '66%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,

  },
});
