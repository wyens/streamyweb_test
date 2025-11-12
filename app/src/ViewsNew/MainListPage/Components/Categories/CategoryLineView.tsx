import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { type CategoryLine, PADDING_ON_CATEGORY_LIST } from "~/src/Controllers/Pages/MainPage/MainCategory/CategoryLine";

class CategoryLineView extends ViewItem {
    get controller(): CategoryLine {
        return this.props.controller;
    }

    render() {
        const { isVisible, left, width, sectionEnabled } = this.controller;

        const containerStyle: React.CSSProperties = {
            ...styles.container,
            ...(sectionEnabled ? styles.sectionEnabled : {}),
            // paddingLeft: PADDING_ON_CATEGORY_LIST,
            height: 2,
        };

        const lineStyle: React.CSSProperties = {
            ...styles.line,
            transform: `translate3d(${left}px, 0, 0)`,
            width: `${width}px`,
            opacity: isVisible ? 1 : 0,
        };

        return (
            <div style={containerStyle}>
                <div style={lineStyle} />
            </div>
        );
    }
}

export { CategoryLineView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "#2C2F42",
        pointerEvents: "none",
    },
    sectionEnabled: {
        backgroundColor: "#2a326cff",
    },
    line: {
        height: 2,
        backgroundImage: "linear-gradient(90deg, #04E5FD 0%, #1A69FD 100%)",
        willChange: "transform, width, opacity",
        transition: "transform 150ms ease, width 150ms ease, opacity 120ms ease",
        pointerEvents: "none",
    },
};