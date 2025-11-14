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
                onClick={toggleFavorite}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
                style={{
                    ...styles.wrap,
                    ...(focused ? styles.backButtonFocused : {}),
                }}
            >
                <div style={styles.backButton}>
                    <img
                        src={isFavorite ? ICONS.starActive : ICONS.starDefault}
                        style={{
                            ...styles.icon,
                            ...(isFavorite ? styles.activeIcon : {}),
                        }}
                        alt="favorite"
                    />
                </div>
            </button>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    wrap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "transparent",
        background: "transparent",
        cursor: "pointer",
        outline: "none",
    },
    backButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonFocused: {
        borderColor: "#ffffff",
    },
    icon: {
        width: 32,
        height: 32,
    },
    activeIcon: {
        filter: "none",
    },
};