import React from 'react';
import ReactPlayer from 'react-player';
import { ViewItem } from '../../Base/ViewItem';
import { BVideo } from '../../Models/BPlayer/BVideo';
import { BPlayer } from '../../Models/BPlayer/BPlayer';

type WebPlayerProps = {
    link: string;
    bPlayer: BPlayer;
    isLive: boolean;
};

type WebPlayerState = {
    loading: boolean;
    paused: boolean;
    preloader: boolean;
};

class BVideoView extends ViewItem {
    get controller(): BVideo {
        return this.props.controller;
    }

    render() {
        const { link, bPlayer } = this.controller;

        if (!link) {
            return <div className="video-container" />;
        }

        const isFullScreen = bPlayer.video.isFullScreen;
        const isLive = bPlayer.isLive;

        return (
            <div className={`video-container ${isFullScreen ? 'video-fullscreen' : ''}`}>
                <WebPlayer link={link} bPlayer={bPlayer} isLive={isLive} />
            </div>
        );
    }
}

export { BVideoView };

class WebPlayer extends React.Component<WebPlayerProps, WebPlayerState> {
    playerRef: React.RefObject<typeof ReactPlayer | null>;

    constructor(props: WebPlayerProps) {
        super(props);
        this.playerRef = React.createRef<typeof ReactPlayer>();
        this.state = {
            loading: true,
            paused: false,
            preloader: true,
        };
    }

    componentDidMount(): void {
        this.setState({ loading: false });
        this.props.bPlayer.video.setPlayerRef?.(this.playerRef);
    }

    componentDidUpdate(prevProps: Readonly<WebPlayerProps>): void {
        if (prevProps.link !== this.props.link) {
            this.setState({ preloader: true });
        }
    }

    pause = () => {
        this.justPause();
        this.props.bPlayer.listeners.onPause?.();
    };

    justPause = () => {
        this.setState({ paused: true });
    };

    play = () => {
        this.justPlay();
        this.props.bPlayer.listeners.onPlay?.();
    };

    justPlay = () => {
        this.setState({ paused: false });
    };

    get paused() {
        return this.state.paused;
    }

    handleReady = (e?: any) => {
        // this.props.bPlayer.listeners.onCanPlay?.(e);
        setTimeout(() => this.setState({ preloader: false }), 200);
    };

    handleStart = () => {
        this.setState({ preloader: true });
        this.props.bPlayer.listeners.onLoadStart?.();
    };

    handleProgress = (progress: any) => {
        this.props.bPlayer.listeners.onTimeUpdated?.(progress);
    };

    handlePlay = () => {
        console.log('handlePlay')
        this.play();
    };

    handlePause = () => {
        console.log('handlePause')
        this.pause();
    };

    handleError = (error: any) => {
        console.error('WEB PLAYER ERROR', error);
    };

    render() {
        const { link, bPlayer, isLive } = this.props;
        const { loading, paused, preloader } = this.state;

        if (loading) {
            return null;
        }

        const url = isLive ? `${link}/watch.m3u8` : link;

        // bPlayer.debug?.setItem?.('source', { url });

        return (
            <div className="video-inner">
                <ReactPlayer
                    ref={this.playerRef}
                    className="react-player"
                    src={'https://content.jwplatform.com/manifests/yp34SRmf.m3u8'}
                    playing={!paused}
                    muted={false}
                    controls={false}
                    width="100%"
                    height="100%"
                    onReady={this.handleReady}
                    onStart={this.handleStart}
                    onProgress={this.handleProgress}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    onError={this.handleError}
                />

                {/*{preloader && (*/}
                {/*    <div className="video-loader">*/}
                {/*        <div className="spinner" />*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        );
    }
}

export { WebPlayer };