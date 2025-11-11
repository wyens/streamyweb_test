import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem.tsx';
import { ControllerControlsVideo } from '../../Models/ControllerControlsVideo/ControllerControlsVideo.ts';
import { PlayPauseButton } from './PlayPauseButton.tsx';
import { VideoHeader } from './VideoHeader.tsx';
import { TVInfo } from './TVInfo.tsx';
import { TVUpNext } from './TVUpNext.tsx';
import { VideoChannels } from './VideoChannels.tsx';
import { EPGList } from './EPGList/EPGList.tsx';
import { FocusScope } from './FocusScope.tsx';
import { ChannelList } from './ChannelList/ChannelList.tsx';
import { VideoFavorite } from './VideoFavorite.tsx';
import { gradientBottom, gradientTop } from '../../Constants/icons.ts';

export class ViewControlsVideo extends ViewItem {
  get controller(): ControllerControlsVideo {
    return this.props.controller;
  }

  render() {
    const { isVisible } = this.controller;

    const epgOpen = this.controller.controllerEPG.isVisible;
    const channelOpen = this.controller.controllerChannelList.isVisible;
    const anyOverlayOpen = epgOpen || channelOpen;

    const disableMain = anyOverlayOpen;
    const disableEPG = !epgOpen;
    const disableChannel = !channelOpen;

    return (
      <View pointerEvents={isVisible ? 'auto' : 'none'} style={[StyleSheet.absoluteFill, styles.layer]}>
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#000',
              opacity: anyOverlayOpen ? this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25] }) : 0,
            },
          ]}
        />

        <Animated.Image source={gradientTop} style={[styles.topGradient, { opacity: this.controller.opacity }]} resizeMode="stretch" />
        <Animated.Image source={gradientBottom} style={[styles.bottomGradient, { opacity: this.controller.opacity }]} resizeMode="stretch" />

        {/* header */}
        <Animated.View
          style={[styles.tvHeaderContainer, { opacity: this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}
        >
          <FocusScope disabled={disableMain}>
            <View style={[styles.wrapHeader]}>
              <VideoHeader controller={this.controller.TVHeaderModel} ref={this.controller.TVHeaderModel.set} />
              <VideoFavorite controller={this.controller.TVFavoriteModel} ref={this.controller.TVFavoriteModel.set} />
            </View>
          </FocusScope>
        </Animated.View>

        {/* TV info */}
        <Animated.View
          style={[styles.tvInfoContainer, { opacity: this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}
        >
          <FocusScope disabled={disableMain}>
            <TVInfo controller={this.controller.TVInfoModel} ref={this.controller.TVInfoModel.set} />
          </FocusScope>
        </Animated.View>

        {/* TV Up Next */}
        <Animated.View
          style={[styles.tvUpNextContainer, { opacity: this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}
        >
          <FocusScope disabled={disableMain}>
            <TVUpNext controller={this.controller.TVUpNextModel} ref={this.controller.TVUpNextModel.set} />
          </FocusScope>
        </Animated.View>

        {/* Video Channels */}
        <Animated.View
          style={[styles.tvChannelsContainer, { opacity: this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}
        >
          <FocusScope disabled={disableMain}>
            <VideoChannels opacity={this.controller.opacity} onBack={this.controller.showChannelList} title="Channels" />
          </FocusScope>
        </Animated.View>

        {/* Play/Pause */}
        <Animated.View style={[styles.iconContainer, { opacity: this.controller.opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}>
          <FocusScope disabled={disableMain}>
            <PlayPauseButton controller={this.controller.controllerPlayPauseButton} ref={this.controller.controllerPlayPauseButton.set} />
          </FocusScope>
        </Animated.View>

        {/* EPG  */}
        <FocusScope style={[StyleSheet.absoluteFill, styles.overlay]} disabled={disableEPG}>
          <EPGList controller={this.controller.controllerEPG} ref={this.controller.controllerEPG.set} />
        </FocusScope>

        {/* ChannelList */}
        <FocusScope style={[StyleSheet.absoluteFill, styles.overlay]} disabled={disableChannel}>
          <ChannelList controller={this.controller.controllerChannelList} ref={this.controller.controllerChannelList.set} />
        </FocusScope>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layer: {
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 84,
    zIndex: 2,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 221,
    zIndex: 2,
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
    zIndex: 3,
  },
  tvInfoContainer: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    zIndex: 3,
  },
  tvUpNextContainer: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    zIndex: 3,
  },
  tvHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    zIndex: 2,
    elevation: 2,
  },
  tvChannelsContainer: {
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{ translateX: -77.5 }],
    zIndex: 3,
  },
  overlay: {
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'flex-end',
  },
  wrapHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
