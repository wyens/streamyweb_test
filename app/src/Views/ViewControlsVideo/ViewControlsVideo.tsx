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
import {ChannelList} from "~/src/Views/ViewControlsVideo/ChannelList/ChannelList";




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
            <div className={"view-controls-video flex1" + (isVisible ? "" : " view-controls-video--hidden")}>
                {/* header */}
                <div className="vcv-tv-header-container">
                    <div className="vcv-wrap-header">
                        <VideoHeader
                            controller={this.controller.TVHeaderModel}
                            ref={this.controller.TVHeaderModel.set}
                        />
                        <VideoFavorite
                            controller={this.controller.TVFavoriteModel}
                            ref={this.controller.TVFavoriteModel.set}
                        />
                    </div>
                </div>

                {/* TV info */}
                <div className="vcv-tv-info-container">
                    <TVInfo
                        controller={this.controller.TVInfoModel}
                        ref={this.controller.TVInfoModel.set}
                    />
                </div>

                {/* TV Up Next */}
                <div className="vcv-tv-upnext-container">
                    <TVUpNext
                        controller={this.controller.TVUpNextModel}
                        ref={this.controller.TVUpNextModel.set}
                    />
                </div>

                {/* Video Channels */}
                <div className="vcv-tv-channels-container">
                    <VideoChannels
                        opacity={1}
                        onBack={this.controller.showChannelList}
                        title="Channels"
                    />
                </div>

                {/* Play / Pause */}
                <div className="vcv-icon-container">
                    <PlayPauseButton
                        controller={this.controller.controllerPlayPauseButton}
                        ref={this.controller.controllerPlayPauseButton.set}
                    />
                </div>

                {/* EPG overlay */}
                <div className={"vcv-overlay" + (disableEPG ? " vcv-overlay--disabled" : "")}>
                    <EPGList
                        controller={this.controller.controllerEPG}
                        ref={this.controller.controllerEPG.set}
                    />
                </div>

                <div className={"vcv-overlay" + (disableChannel ? " vcv-overlay--disabled" : "")}>
                    <ChannelList
                        controller={this.controller.controllerChannelList}
                        ref={this.controller.controllerChannelList.set}
                    />
                </div>
            </div>
        );
    }
}

export { ViewControlsVideo };
