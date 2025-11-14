import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type { ControllerEPG } from "~/src/Models/ControllerControlsVideo/EPGList/ControllerEPG";
import { EpgView } from "~/src/Views/Screens/MainStack/IptvPage/EpgView";

export class EPGList extends ViewItem {
    get controller(): ControllerEPG {
        return this.props.controller;
    }
    onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            this.controller.hide?.();
        }
    };
    render() {
        const { isVisible } = this.controller;
        if (!isVisible) {
            return null;
        }

        return (
            <div
                onClick={this.onOverlayClick}
                style={{
                    ...styles.overlay,
                    pointerEvents: isVisible ? "auto" : "none",
                }}
            >
                <div
                    style={styles.panel}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            this.controller.hide?.();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <EpgView
                        ref={this.controller.epgModel.set}
                        controller={this.controller.epgModel}
                    />
                </div>
            </div>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
        backgroundColor: "rgba(0,0,0,0.0)",
        transition: "opacity 0.25s ease-out",
        top: 0,
        bottom:0,
        width: "100%",
    },
    panel: {
        width: "100%",
        height: "66vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        outline: "none",
    },
};