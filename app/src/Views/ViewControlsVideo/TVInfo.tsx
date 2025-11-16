import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { TVInfoModel } from "~/src/Models/ControllerControlsVideo/TVInfoModel";
import { TextItem } from "~/src/Views/Components/TextItem";
import { LiveBadge } from "./LiveBadge";


export class TVInfo extends ViewItem {
    get controller(): TVInfoModel {
        return this.props.controller;
    }

    render() {
        const { title, timeText, metaText, logoSource, live } = this.controller;

        return (
            <div className="tvinfo-card">
                <div className="tvinfo-top-row">
                    {logoSource && (
                        <img src={logoSource} className="tvinfo-logo" alt="channel logo" />
                    )}

                    {!!timeText && (
                        <TextItem className="tvinfo-time-text">{timeText}</TextItem>
                    )}
                </div>

                {!!title && (
                    <TextItem className="tvinfo-title">{title}</TextItem>
                )}

                <div className="tvinfo-bottom-row">
                    {!!metaText && (
                        <TextItem className="tvinfo-meta">{metaText}</TextItem>
                    )}

                    {live && (
                        <div className="tvinfo-live-badge">
                            <LiveBadge />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}