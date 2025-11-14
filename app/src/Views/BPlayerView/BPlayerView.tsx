import { ViewItem } from '../../Base/ViewItem';
import { BPlayer } from '../../Models/BPlayer/BPlayer';
import { BFullScreenView } from './BFullScreenView';
import React from 'react';
import {ViewControlsVideo} from "~/src/Views/ViewControlsVideo/ViewControlsVideo";

class BPlayerView extends ViewItem {
  get controller(): BPlayer {
    return this.props.controller;
  }
  render() {
    const { video, state, videoControls, bFullScreen, debug } = this.controller;
    return (
      <div style={styles.container} className={'flex1'}>
        {/* <BVidDebugView ref={debug.set} controller={debug}/> */}
        <BFullScreenView ref={bFullScreen.set} controller={bFullScreen}>
          <div style={styles.box}>
            {/*<BStateView ref={state.set} controller={state} />*/}
            <ViewControlsVideo controller={videoControls} ref={videoControls.set} />
            {/*<BVideoView ref={video.set} controller={video} />*/}
          </div>
        </BFullScreenView>
      </div>
    );
  }
}

export { BPlayerView };

const styles = ({
  container: {
    flex: 1,
      display: 'flex',
  },
  box: {
      flex: 1,
      display: 'flex',
  },
});
