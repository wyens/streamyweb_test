import { ViewItem } from '../../Base/ViewItem';
import { BPlayer } from '../../Models/BPlayer/BPlayer';
import { BStateView } from './BStateView';
import { BVideoView } from './BVideoView';
import { StyleSheet, View } from 'react-native';
import { BFullScreenView } from './BFullScreenView';
import { ViewControlsVideo } from '../ViewControlsVideo/ViewControlsVideo.tsx';
import React from 'react';

class BPlayerView extends ViewItem {
  get controller(): BPlayer {
    return this.props.controller;
  }
  render() {
    const { video, state, videoControls, bFullScreen, debug } = this.controller;
    return (
      <View style={styles.container}>
        {/* <BVidDebugView ref={debug.set} controller={debug}/> */}
        <BFullScreenView ref={bFullScreen.set} controller={bFullScreen}>
          <View style={styles.box}>
            <BStateView ref={state.set} controller={state} />
            <ViewControlsVideo controller={videoControls} ref={videoControls.set} />
            <BVideoView ref={video.set} controller={video} />
          </View>
        </BFullScreenView>
      </View>
    );
  }
}

export { BPlayerView };

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    flex: 1,
    backgroundColor: 'black',
  },
  box: {
    position: 'relative',
  },
});
