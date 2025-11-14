import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { TVInfoModel } from "~/src/Models/ControllerControlsVideo/TVInfoModel";
import { COLORS } from "~/src/assets/styles/colors";
import { FONTS } from "~/src/assets/styles/fonts";
import { TextItem } from "~/src/Views/Components/TextItem";
import { LiveBadge } from "./LiveBadge";

export class TVInfo extends ViewItem {
    get controller(): TVInfoModel {
        return this.props.controller;
    }

    render() {
        const { title, timeText, metaText, logoSource, live } = this.controller;

        return (
            <div style={styles.card}>
                {/* top row: logo + time */}
                <div style={styles.topRow}>
                    {logoSource && (
                        <img src={logoSource} style={styles.logo} alt="channel logo" />
                    )}
                    {!!timeText && (
                        <TextItem stylesText={styles.timeText}>{timeText}</TextItem>
                    )}
                </div>

                {/* title */}
                {!!title && <TextItem stylesText={styles.title}>{title}</TextItem>}

                {/* bottom row: meta left + LIVE badge right */}
                <div style={styles.bottomRow}>
                    {!!metaText && <TextItem stylesText={styles.meta}>{metaText}</TextItem>}

                    {live && (
                        <div style={styles.liveBadge}>
                            <LiveBadge />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        paddingInline: 15,
        paddingBlock: 10,
        width: "100%",
        maxWidth: 900,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        boxSizing: "border-box",
    },

    topRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    logo: {
        width: 50,
        height: 50,
        objectFit: "contain",
        marginRight: 15,
    },

    timeText: {
        color: COLORS.FONTCOLOR_WHITE,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },

    title: {
        color: COLORS.FONTCOLOR_WHITE,
        fontSize: 18,
        fontFamily: FONTS.bold,
    },

    bottomRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        gap: 10,
    },

    meta: {
        color: COLORS.FONTCOLOR_GRAY,
        fontSize: 16,
        fontFamily: FONTS.regular,
    },

    liveBadge: {
        paddingLeft: 15,
    },
};