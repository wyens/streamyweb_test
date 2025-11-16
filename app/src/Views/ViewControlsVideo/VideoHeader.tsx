import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { TVHeaderModel } from "~/src/Models/ControllerControlsVideo/TVHeaderModel";
import { BASE_ICONS } from "~/src/Constants/icons";
import { TextItem } from "~/src/Views/Components/TextItem";


export class VideoHeader extends ViewItem {
    get controller(): TVHeaderModel {
        return this.props.controller;
    }

    render() {
        const { onPress, setFocused, focused, title } = this.controller;

        return (
            <button
                className={"vh-wrap" + (focused ? " vh-wrap--focused" : "")}
                onClick={onPress}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
            >
                <div className="vh-icon-box">
                    <img src={BASE_ICONS.backWhite} className="vh-icon" alt="back" />
                </div>

                {title && (
                    <TextItem customStyle={{}} className="vh-title">
                        {title}
                    </TextItem>
                )}
            </button>
        );
    }
}