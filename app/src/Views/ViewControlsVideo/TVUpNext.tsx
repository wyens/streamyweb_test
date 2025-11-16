import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { TVUpNextModel } from "~/src/Models/ControllerControlsVideo/TVUpNextModel";
import { TextItem } from "~/src/Views/Components/TextItem";
import { BASE_ICONS } from "~/src/Constants/icons";


export class TVUpNext extends ViewItem {
    get controller(): TVUpNextModel {
        return this.props.controller;
    }

    render() {
        const { onPress, setFocused, focused, title, metaText } = this.controller;

        if (!title) return null;

        return (
            <button
                className={"tvup-card" + (focused ? " tvup-card--focused" : "")}
                onClick={onPress}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
            >
                <div className="tvup-left">
                    <div className="tvup-top-row">
                        <TextItem className="tvup-upnext">Következik</TextItem>
                    </div>

                    <TextItem className="tvup-title">{title}</TextItem>

                    <div className="tvup-bottom-row">
                        {!!metaText && (
                            <TextItem className="tvup-meta">{metaText}</TextItem>
                        )}
                    </div>
                </div>

                <img
                    src={BASE_ICONS.right}
                    className="tvup-arrow"
                    style={{ transform: "rotate(90deg)" }}
                    alt=""
                />
            </button>
        );
    }
}