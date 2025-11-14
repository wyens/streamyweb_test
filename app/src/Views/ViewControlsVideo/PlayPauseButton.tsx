import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { ControllerPlayPauseButton } from "~/src/Models/ControllerControlsVideo/ControllerPlayPauseButton";
import { PLAYERICONS } from "~/src/Constants/icons";

 export class PlayPauseButton extends ViewItem {
    get controller(): ControllerPlayPauseButton {
        return this.props.controller;
    }

    render() {
        const { isPlaying, onPress, focused, setFocused, ref } = this.controller;
        return (
            <button
                type="button"
                onClick={onPress}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
                style={{
                    ...styles.button,
                    ...(focused ? styles.focused : {}),
                }}
            >
                <img
                    src={!isPlaying ? PLAYERICONS.playMini : PLAYERICONS.pauseWhite}
                    style={styles.icon}
                    alt={isPlaying ? "Pause" : "Play"}
                />
            </button>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    button: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: 8,
        background: "transparent",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        cursor: "pointer",
        outline: "none",
    },
    focused: {
        borderColor: "#ffffff",
    },
    icon: {
        width: 70,
        height: 70,
        objectFit: "contain",
    },
};