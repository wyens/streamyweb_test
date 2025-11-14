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
                onClick={onPress}
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
                    <img src={BASE_ICONS.backWhite} style={styles.backIcon} alt="back" />
                </div>

                {title && (
                    <TextItem style="default" customStyle={styles.title}>
                        {title}
                    </TextItem>
                )}
            </button>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    wrap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 0,
        paddingRight: 15,

        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "transparent",

        borderRadius: 5,
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

    backIcon: {
        width: 26,
        height: 26,
        objectFit: "contain",
    },

    title: {
        marginLeft: 8,
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 600,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
};