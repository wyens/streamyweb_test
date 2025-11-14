import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type { EpgItem } from "~/src/Controllers/Pages/HomeStack/IptvPage/EpgItem";
import { TextItem } from "~/src/Views/Components/TextItem";
import { COLORS } from "~/src/assets/styles/colors";
import { FONTS } from "~/src/assets/styles/fonts";

export const EPG_ITEM_HEIGHT = 46;

class EpgItemView extends ViewItem {
    get controller(): EpgItem {
        return this.props.controller;
    }

    render() {
        const { betweens, name, selected, disabled } = this.controller;

        const disabledStyle: React.CSSProperties = disabled ? styles.disabled : {};

        return (
            <div style={styles.container}>
                {selected && <div style={styles.selectedBg} />}
                {selected && <div style={styles.selectedStroke} />}

                <div style={styles.contentRow}>
                    <TextItem
                        style="default"
                        customStyle={{ ...styles.time, ...disabledStyle }}
                    >
                        {betweens}
                    </TextItem>

                    <TextItem
                        style="default"
                        customStyle={{ ...styles.name, ...disabledStyle }}
                    >
                        {name}
                    </TextItem>
                </div>
            </div>
        );
    }
}

export { EpgItemView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: EPG_ITEM_HEIGHT,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 28,
        overflow: "hidden",
        boxSizing: "border-box",
    },

    contentRow: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        zIndex: 1,
    },

    selectedBg: {
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 28,
        pointerEvents: "none",
    },

    selectedStroke: {
        position: "absolute",
        inset: 0,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: COLORS.FONTCOLOR_WHITE,
        borderRadius: 28,
        pointerEvents: "none",
        boxSizing: "border-box",
    },

    disabled: {
        color: "hsl(0,0%,55%)",
    },

    time: {
        width: 140,
        marginRight: 16,
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.FONTCOLOR_WHITE,
        whiteSpace: "nowrap",
    },

    name: {
        flex: 1,
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.FONTCOLOR,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
};