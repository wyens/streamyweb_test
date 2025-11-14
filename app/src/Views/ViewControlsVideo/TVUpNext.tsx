import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { TVUpNextModel } from "~/src/Models/ControllerControlsVideo/TVUpNextModel";
import { COLORS } from "~/src/assets/styles/colors";
import { FONTS } from "~/src/assets/styles/fonts";
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
                onClick={onPress}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
                style={{
                    ...styles.card,
                    ...(focused ? styles.cardFocused : {}),
                }}
            >
                <div style={{ flex: 1 }}>
                    {/* top row */}
                    <div style={styles.topRow}>
                        <TextItem stylesText={styles.upNextText}>Következik</TextItem>
                    </div>

                    {/* title */}
                    {!!title && <TextItem stylesText={styles.title}>{title}</TextItem>}

                    {/* bottom row */}
                    <div style={styles.bottomRow}>
                        {!!metaText && <TextItem stylesText={styles.meta}>{metaText}</TextItem>}
                    </div>
                </div>

                <img
                    src={BASE_ICONS.right}
                    style={{
                        ...styles.arrowIcon,
                        transform: "rotate(90deg)",
                    }}
                    alt=""
                />
            </button>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
        maxWidth: 900,
        minWidth: 266,
        borderRadius: 12,
        border: "2px solid transparent",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        outline: "none",
        transition: "border-color 130ms ease, background-color 130ms ease",
    },

    cardFocused: {
        borderColor: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.9)",
    },

    topRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    upNextText: {
        color: COLORS.FONTCOLOR_GRAY,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },

    title: {
        color: COLORS.FONTCOLOR_WHITE,
        fontSize: 18,
        fontFamily: FONTS.bold,
    },

    bottomRow: {
        marginTop: 10,
    },

    meta: {
        color: COLORS.FONTCOLOR_GRAY,
        fontSize: 16,
        fontFamily: FONTS.regular,
    },

    arrowIcon: {
        width: 32,
        height: 32,
        objectFit: "contain",
        marginLeft: 10,
    },
};