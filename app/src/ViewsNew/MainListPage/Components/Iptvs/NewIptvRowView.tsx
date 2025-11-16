import React, { type CSSProperties } from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type { IptvChannel } from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import { PressableFocusView } from "~/src/ViewsNew/MainListPage/Components/Iptvs/PressableFocusView";
import {IptvChannelNameView} from "~/src/ViewsNew/MainListPage/Components/Iptvs/IptvChannelNameView";
import {controllers} from "~/src/Controllers/Controllers";
import {ChannelThumbnail} from "~/src/ViewsNew/MainListPage/Components/Iptvs/ThumbnailView";

const ROW_H = 118;
const THUMB_W = 180;
const THUMB_H = Math.round((THUMB_W * 9) / 16);


export class NewIptvRowView extends ViewItem {
    get controller(): IptvChannel {
        return this.props.controller;
    }

    render() {
        const { title, selectedEpg, selected, setFocusItem, visible, onPressItem, channelHash } = this.controller;

        if (!visible) {
            return null;
        }

        return (
            <div style={styles.container}>
                <PressableFocusView
                    setFocusItem={setFocusItem}
                    focused={selected}
                    style={styles.wrap}
                    channel={this.controller}
                    onPress={onPressItem}
                >
                    <div style={styles.card}>
                        <IptvChannelNameView controller={this.controller} />
                        <div style={styles.thumbWrap}>
                            <ChannelThumbnail
                              saveAbortSignal={controllers().abortControl.setAbortSignal}
                              onLoaded={() => {}}
                              channelToken={channelHash}
                            />
                        </div>

                        <div style={styles.meta}>
                            {!!selectedEpg?.betweens && (
                                <p style={styles.timeText}>{selectedEpg.betweens}</p>
                            )}
                            <p style={styles.title}>{selectedEpg?.name ?? title}</p>
                        </div>
                    </div>
                </PressableFocusView>
            </div>
        );
    }
}


const styles: Record<string, CSSProperties> = {
    container: {
        width: "100%",
        marginBottom: 10,
        flex: 1,
    },
    wrap: {
        borderRadius: 15,
        backgroundColor: "#2D333D",
        width: "100%",
    },
    card: {
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px 14px",
        borderRadius: 18,
        overflow: "hidden",
    },
    thumbWrap: {
        width: THUMB_W,
        height: THUMB_H,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.04)",
        marginRight: 14,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    meta: {
        flex: 1,
        minWidth: 0,
    },
    timeText: {
        fontSize: 14,
        opacity: 0.75,
        marginBottom: 4,
        color: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: "#fff",
    },
};