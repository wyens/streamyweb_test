import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type { ControllerControlsVideo } from "~/src/Models/ControllerControlsVideo/ControllerControlsVideo";

import { PlayPauseButton } from "./PlayPauseButton";
import { VideoHeader } from "./VideoHeader";
import { TVInfo } from "./TVInfo";
import { TVUpNext } from "./TVUpNext";
import { VideoChannels } from "./VideoChannels";
import { VideoFavorite } from "./VideoFavorite";
import {EPGList} from "~/src/Views/ViewControlsVideo/EPGList/EPGList";




 class ViewControlsVideo extends ViewItem {
    get controller(): ControllerControlsVideo {
        return this.props.controller;
    }

    render() {
        // const { isVisible } = this.controller;
        let isVisible = true;

        const epgOpen = this.controller.controllerEPG.isVisible;
        const channelOpen = this.controller.controllerChannelList.isVisible;
        const anyOverlayOpen = epgOpen || channelOpen;

        const disableMain = anyOverlayOpen;
        const disableEPG = !epgOpen;
        const disableChannel = !channelOpen;


        return (
            <div
                style={{
                    ...styles.layer,
                    pointerEvents: isVisible ? "auto" : "none",
                    opacity: isVisible ? 1 : 0,
                }}
                className={'flex1'}
            >
                {/* header */}
                <div style={styles.tvHeaderContainer}>
                    <div style={styles.wrapHeader}>
                        <VideoHeader controller={this.controller.TVHeaderModel} ref={this.controller.TVHeaderModel.set} />
                        <VideoFavorite controller={this.controller.TVFavoriteModel} ref={this.controller.TVFavoriteModel.set} />
                    </div>
                </div>
                {/* TV info */}
                <div style={styles.tvInfoContainer}>
                    <TVInfo controller={this.controller.TVInfoModel} ref={this.controller.TVInfoModel.set} />
                </div>

                {/* TV Up Next */}
                <div style={styles.tvUpNextContainer}>
                    <TVUpNext controller={this.controller.TVUpNextModel} ref={this.controller.TVUpNextModel.set} />
                </div>

                {/* Video Channels */}
                <div style={styles.tvChannelsContainer}>
                    <VideoChannels
                        opacity={1}
                        onBack={this.controller.showChannelList}
                        title="Channels"
                    />
                </div>

                {/* Play / Pause */}
                <div style={styles.iconContainer}>
                    <PlayPauseButton
                        controller={this.controller.controllerPlayPauseButton}
                        ref={this.controller.controllerPlayPauseButton.set}
                    />
                </div>

                <div
                    style={{
                        ...styles.overlay,
                        pointerEvents: disableEPG ? "none" : "auto",
                        opacity: disableEPG ? 0 : 1,
                    }}
                >
                    <EPGList controller={this.controller.controllerEPG} ref={this.controller.controllerEPG.set} />
                </div>

                {/*<div*/}
                {/*    style={{*/}
                {/*        ...styles.overlay,*/}
                {/*        pointerEvents: disableChannel ? "none" : "auto",*/}
                {/*        opacity: disableChannel ? 0 : 1,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ChannelList controller={this.controller.controllerChannelList} ref={this.controller.controllerChannelList.set} />*/}
                {/*</div>*/}
            </div>
        )
    }
}

export { ViewControlsVideo };

const styles: Record<string, React.CSSProperties> = {
    layer: {
        position: "absolute",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.25s ease",
        backgroundColor: 'red',
        width: "100%",
        height: "100%",
    },
    dimBackground: {
        position: "absolute",
        inset: 0,
        backgroundColor: "#000",
        pointerEvents: "none",
        transition: "opacity 0.25s ease",
    },
    topGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 84,
        zIndex: 2,
        pointerEvents: "none",
    },
    bottomGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 221,
        zIndex: 2,
        pointerEvents: "none",
    },
    iconContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -50,
        marginTop: -50,
        zIndex: 3,
    },
    tvInfoContainer: {
        position: "absolute",
        bottom: 40,
        left: 10,
        zIndex: 3,
    },
    tvUpNextContainer: {
        position: "absolute",
        bottom: 40,
        right: 10,
        zIndex: 3,
    },
    tvHeaderContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingInline: 5,
        zIndex: 2,
    },
    tvChannelsContainer: {
        position: "absolute",
        bottom: 5,
        left: "50%",
        transform: "translateX(-77.5px)",
        zIndex: 3,
    },
    overlay: {
        position: "absolute",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        transition: "opacity 0.2s ease",
    },
    wrapHeader: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
};