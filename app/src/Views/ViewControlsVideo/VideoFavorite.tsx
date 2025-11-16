import React from "react";
import type { TVFavoriteModel } from "~/src/Models/ControllerControlsVideo/TVFavoriteModel";
import { ViewItem } from "~/src/Base/ViewItem";
import { ICONS } from "~/src/Constants/icons";


export class VideoFavorite extends ViewItem {
    get controller(): TVFavoriteModel {
        return this.props.controller;
    }

    render() {
        const { toggleFavorite, setFocused, focused, isFavorite } = this.controller;

        return (
            <button
                type="button"
                className={"vf-wrap" + (focused ? " vf-wrap--focused" : "")}
                onClick={toggleFavorite}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
            >
                <div className="vf-icon-box">
                    <img
                        src={isFavorite ? ICONS.starActive : ICONS.starDefault}
                        className={
                            "vf-icon" + (isFavorite ? " vf-icon--active" : "")
                        }
                        alt="favorite"
                    />
                </div>
            </button>
        );
    }
}