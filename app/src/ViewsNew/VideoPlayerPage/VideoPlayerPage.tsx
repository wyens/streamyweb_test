import React from 'react';

import { ViewItem } from '../../Base/ViewItem';
import { VideoPlayerPageModel } from '../../Controllers/Pages/NewScreens/VideoPlayerPageModel';


class VideoPlayerPage extends ViewItem {
  private focusUnsub: any;
  get controller(): VideoPlayerPageModel {
    return this.props.controller;
  }
  componentDidMount(): void {
    this.controller.init();
  }
  componentWillUnmount(): void {
    this.controller.blur();
    this.focusUnsub?.();
  }
  render() {
    return (
        <div className={'screen_container'}>
            VIDEO SCREEN
        {/*<BPlayerView ref={this.controller.bPlayer.set} controller={this.controller.bPlayer} />*/}
      </div>
    );
  }
}

export { VideoPlayerPage };

