import { BackHandler, StyleSheet, View } from 'react-native';
import React from 'react';

import { ViewItem } from '../../Base/ViewItem';
import { VideoPlayerPageModel } from '../../Controllers/Pages/NewScreens/VideoPlayerPageModel';
import { BPlayerView } from '../../Views/BPlayerView/BPlayerView.tsx';
import { controllers } from '../../Controllers/Controllers.ts';

class VideoPlayerPage extends ViewItem {
  private focusUnsub: any;
  get controller(): VideoPlayerPageModel {
    return this.props.controller;
  }
  componentDidMount(): void {
    this.controller.init();
    this.focusUnsub = this.props.navigation.addListener('focus', () => {
      controllers().remoteControls.setOnRemoteEvent(this.controller.RemoteEvent);
    });
  }
  componentWillUnmount(): void {
    this.controller.blur();
    this.focusUnsub?.();
  }
  render() {
    return (
      <View style={[styles.container]}>
        <BPlayerView ref={this.controller.bPlayer.set} controller={this.controller.bPlayer} />
      </View>
    );
  }
}

export { VideoPlayerPage };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
