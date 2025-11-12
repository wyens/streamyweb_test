import React from "react";
import { DISTANCE_BETWEEN_ITEMS, IptvHeaderRowView } from "./IptvHeaderRow";
import { ChannelSlotsView } from "./ChannelSlotsView";
import {ViewItem} from "~/src/Base/ViewItem";
import type {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import {controllers} from "~/src/Controllers/Controllers";
import {TextItem} from "~/src/Views/Components/TextItem";
import {ChannelThumbnail} from "~/src/ViewsNew/MainListPage/Components/Iptvs/ThumbnailView";

class IptvRowView extends ViewItem {
    get controller(): IptvChannel {
        return this.props.controller;
    }

    render() {
        const {
            selectedEpg,
            channelSlots,
            selected,
            thumbnail,
            generateThumbnail,
            focusedType,
            channelHash,
            onLoadedThumbnail,
            visible,
        } = this.controller;

        if (!visible) return null;

        return (
            <div style={styles.container}>
                <IptvHeaderRowView
                    type="mainepg"
                    isMainColor
                    pressable
                    noMargin
                    noPadding
                    channel={this.controller}
                    focused={selected}
                    onFocusAddition={() => {
                        focusedType(true);
                        generateThumbnail();
                    }}
                    onBlurAddition={focusedType}
                >
                    <div style={styles.mainepgContainer}>
                        {thumbnail && (
                            <ChannelThumbnail
                                saveAbortSignal={controllers().abortControl.setAbortSignal}
                                onLoaded={onLoadedThumbnail}
                                channelToken={channelHash}
                            />
                        )}
                        <div style={styles.mainepgTexts}>
                            <TextItem customStyle={styles.endsSoon}>{selectedEpg?.betweens}</TextItem>
                            <TextItem customStyle={styles.mainepgTitle}>
                                {selectedEpg?.name}
                            </TextItem>
                        </div>
                    </div>
                </IptvHeaderRowView>

                {channelSlots && <ChannelSlotsView ref={channelSlots.set} controller={channelSlots} />}
            </div>
        );
    }
}

export { IptvRowView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "row",
        marginBottom: DISTANCE_BETWEEN_ITEMS,
        height: "20vh",
    },

    mainepgContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 5,
        flex: 1,
    },

    mainepgTexts: {
        flex: 1,
        width: 100,
    },

    endsSoon: {
        color: "#A29F9F",
        fontSize: 12,
    },

    secondaryepg: {
        color: "#A29F9F",
        fontWeight: 600 as any,
        flexWrap: "wrap",
    },

    mainepgTitle: {
        fontSize: 14,
        marginTop: 3,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
};