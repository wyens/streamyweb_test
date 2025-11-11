import React from "react";
import { BASE_ICONS } from "~/src/Constants/icons";

export const HEADER_HEIGHT = 66;

export function HeaderPage() {
    return (
        <div style={styles.container}>
            <div style={styles.bg} />
            <img alt={''} src={BASE_ICONS.sttechlogo} style={styles.sttechlogo} />
            <div></div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "relative",
        height: HEADER_HEIGHT,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        overflow: "hidden",
    },
    bg: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(#1C1E2C, #17181E)",
        zIndex: -1,
    },
    sttechlogo: {
        width: 83,
        height: 23,
        objectFit: "contain",
    },
};