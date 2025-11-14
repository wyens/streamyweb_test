import React from "react";
import { ViewItem } from "../../Base/ViewItem";
import { controllers } from "../../Controllers/Controllers";
import type {BFullScreen} from "~/src/Models/BPlayer/BFullScreen";

class BFullScreenView extends ViewItem {
    get controller():BFullScreen {
        return this.props.controller;
    }

    render() {
        const { children } = this.props;
        const { enabled } = this.controller;

        const saLayout = (controllers()?.media?.asLayoutFullScreen) || {};

        const enabledFullScreen = enabled ? styles.enabledFullScreen : {};
        const enabledFullScreenBox = enabled ? { ...styles.enabledFullScreenBox, ...saLayout } : {};

        if (enabled) {
            return (
                <div className={'flex1'}>
                    {children}
                </div>
            );
        }

        return (
            <div className={'flex1'}>
                <div  className={'flex1'}>
                    <div  className={'flex1'}>{children}</div>
                </div>
            </div>
        );
    }
}

export { BFullScreenView };

const styles = {
    mainContainer: {

    },
    container: {
    },
    containerBox: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    enabledFullScreen: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       backgroundColor: "red",
    },
    enabledFullScreenBox: {
    },
    insideContainer: {
    },
};