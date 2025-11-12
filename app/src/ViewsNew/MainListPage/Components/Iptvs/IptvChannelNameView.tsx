import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { IptvChannel } from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import { IptvHeaderRowView } from "./IptvHeaderRow";
import { ICONS } from "~/src/Constants/icons";

class IptvChannelNameView extends ViewItem {
    get controller(): IptvChannel{
        return this.props.controller;
    }

    render() {
        const { icon, visible, favoriteStatus } = this.controller;

        if (!visible) return null;

        return (
            <div style={styles.container}>
                <IptvHeaderRowView type="channel" isMainColor centered>
                    <div style={styles.iconWrapper}>
                        <img
                            src={icon}
                            alt="channel"
                            style={styles.icon}
                            onError={(e) => {
                                e.currentTarget.style.opacity = "0.4";
                            }}
                        />
                        {favoriteStatus && (
                            <img
                                src={ICONS.starDefault}
                                alt="favorite"
                                style={styles.favorite}
                            />
                        )}
                    </div>
                </IptvHeaderRowView>
            </div>
        );
    }
}

export { IptvChannelNameView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
        height: "20vh",
    },
    iconWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 70,
        height: 70,
        objectFit: "contain",
        filter: "brightness(0.95)",
    },
    favorite: {
        width: 15,
        height: 15,
        position: "absolute",
        left: 5,
        top: 5,
    },
};