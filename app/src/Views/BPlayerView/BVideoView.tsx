import { ActivityIndicator, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { ViewItem } from '../../Base/ViewItem';
import { BVideo } from '../../Models/BPlayer/BVideo';
import React from 'react';
import Video from 'react-native-video';
import { BPlayer } from '../../Models/BPlayer/BPlayer';
import { controllers } from '../../Controllers/Controllers';

const calcVLCPlayerHeight = (windowWidth: number, aspetRatio: number) => {
  return windowWidth * aspetRatio;
};

class BVideoView extends ViewItem {
  get controller(): BVideo {
    return this.props.controller;
  }
  render() {
    const { link, bPlayer } = this.controller;
    if (!link) {
      return <View style={styles.container} />;
    }
    const saLayout = controllers().media.asLayoutFullScreen;
    const isFullScreenStyle = bPlayer.video.isFullScreen ? [styles.isFullScreen] : {};
    return (
      <View style={[styles.container, isFullScreenStyle]}>
        {bPlayer.isLive ? (
          <AndroidPlayer ref={bPlayer.video.setPlayerRef} bPlayer={bPlayer} link={link} />
        ) : (
          <MoviePlayer ref={bPlayer.video.setPlayerRef} bPlayer={bPlayer} link={link} />
        )}
      </View>
    );
  }
}

export { BVideoView };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    minWidth: Dimensions.get('screen').width,
    flexDirection: 'row',
  },
  isFullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
    minWidth: Dimensions.get('screen').width,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type playerProps = {
  link: string;
  bPlayer: BPlayer;
};
type livePlayerState = {
  loading: boolean;
  paused: boolean;
  preloader: boolean;
  seek: number;
};

class AndroidPlayer extends React.Component<playerProps> {
  playerRef: any;
  state: livePlayerState;
  constructor(props: playerProps) {
    super(props);
    this.playerRef = React.createRef();
    this.state = {
      loading: true,
      paused: false,
      seek: 0,
      preloader: true,
    };
  }
  componentDidMount(): void {
    this.loaded();
  }
  componentDidUpdate(prevProps: Readonly<playerProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (prevProps.link !== this.props.link) {
      this.tryToUpdate();
    }
  }
  tryToUpdate = () => {};
  loaded = () => {
    this.setState({ loading: false });
  };

  tryAction = () => {
    if (this.state.paused) {
      this.play();
    } else {
      this.pause();
    }
  };

  // Play - Pause functional
  pause = () => {
    this.justPause();
    this.props.bPlayer.listeners.onPause();
  };
  justPause = () => {
    this.setState({ paused: true });
  };
  play = () => {
    this.justPlay();
    this.props.bPlayer.listeners.onPlay();
  };
  justPlay = () => {
    this.setState({ paused: false });
  };
  togglePlaying = () => {
    if (this.state.paused) {
      this.play();
    } else {
      this.pause();
    }
  };
  get paused() {
    return this.state.paused;
  }
  // ON Loading Functional
  onLoad = (e: any) => {
    // console.log("ONLOAD")
    this.props.bPlayer.listeners.onCanPlay(e);
    setTimeout(() => {
      this.setState({ preloader: false });
    }, 200);
  };
  onLoadStart = () => {
    // console.log("ONLOADSTART")
    this.setState({ preloader: true });
    this.props.bPlayer.listeners.onLoadStart();
  };
  onTime = (e: any, context: any) => {
    this.props.bPlayer.listeners.onTimeUpdated(e);
  };
  onProgress = (progress: any) => {
    // console.log("ONPROGRESS", progress)
    this.props.bPlayer.listeners.onTimeUpdated(progress);
  };
  render() {
    const { link, bPlayer } = this.props;
    const { loading, paused, preloader } = this.state;

    if (loading) {
      return;
    }
    const linkSource = Platform.OS === 'android' ? `${link}/watch.m3u8` : link;
    const source: any = { uri: linkSource, type: 'm3u8' };

    bPlayer.debug.setItem('source', source);

    // console.log("SOURCE", source)
    return (
      <View style={styles.container}>
        <Video
          ref={this.playerRef}
          source={{ ...source }}
          paused={paused}
          ignoreSilentSwitch={'ignore'}
          muted={false}
          resizeMode={'contain'}
          style={styles.video}
          volume={1.0}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          onError={(error) => console.error('PLAYER ERROR', error)}
          controls={false}
        />

        {preloader && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </View>
    );
  }
}

class MoviePlayer extends React.Component<playerProps> {
  props: playerProps;
  playerRef: any;
  state: livePlayerState = {
    loading: false,
    paused: false,
    seek: 0,
  };
  constructor(props: playerProps) {
    super(props);
    this.playerRef = React.createRef();
    this.props = props;
  }
  pause = () => {
    this.justPause();
    this.props.bPlayer.listeners.onPause();
  };
  justPause = () => {
    this.setState({ paused: true });
  };
  play = () => {
    this.justPlay();
    this.props.bPlayer.listeners.onPlay();
  };
  justPlay = () => {
    this.setState({ paused: false });
  };

  seek = (seek: number) => {
    this.setState({ seek: seek });
  };
  doLoading = () => {
    this.setState({ loading: true });
    setTimeout(this.makeLoaded, 200);
  };
  makeLoaded = () => {
    this.setState({ loading: false, paused: false, seek: 0 });
  };
  render() {
    const { bPlayer, link } = this.props;
    const { paused, loading } = this.state;
    if (loading) {
      return null;
    }
    return Platform.OS === 'android' ? (
      <Video
        ref={this.playerRef}
        source={{ uri: link }}
        paused={paused}
        ignoreSilentSwitch={'ignore'}
        muted={false}
        resizeMode={'contain'}
        style={styles.video}
        onLoad={bPlayer.listeners.onCanPlay}
        onProgress={bPlayer.listeners.onTimeUpdated}
        controls={false}
      />
    ) : null;
  }
}

export { MoviePlayer };
