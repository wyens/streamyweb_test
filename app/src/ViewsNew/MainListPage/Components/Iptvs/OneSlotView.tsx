import React from "react";
import { IptvHeaderRowView } from "./IptvHeaderRow";
import { ViewItem } from "~/src/Base/ViewItem";
import {TextItem} from "~/src/Views/Components/TextItem";
import type {OneTimeSlot} from "~/src/Controllers/Pages/HomeStack/IptvPage/OneTimeSlot";

class OneSlotView extends ViewItem {
    get controller():OneTimeSlot{
        return this.props.controller;
    }

    render() {
        const { allEpgs, channel, slotTakes, focusedTimeSlot } = this.controller;

        return (
            <IptvHeaderRowView
                type="secondaryepg"
                pressable
                channel={channel}
                slotTakes={slotTakes}
                onFocusAddition={focusedTimeSlot}
            >
                {allEpgs &&
                    allEpgs.map((oei, jindex) => (
                        <div
                            key={`${channel.id}_${jindex}_${oei.timeCost}`}
                            style={{ width: 150 }}
                        >
                            <TextItem customStyle={styles.endsSoon}>{oei.betweens}</TextItem>
                            <TextItem customStyle={styles.secondaryepg}>{oei.name}</TextItem>
                        </div>
                    ))}
            </IptvHeaderRowView>
        );
    }
}

export { OneSlotView };

const styles: Record<string, React.CSSProperties> = {
    endsSoon: {
        color: "#A29F9F",
        fontSize: 12,
    },
    secondaryepg: {
        color: "#A29F9F",
        flexWrap: "wrap",
        fontSize: 14,
        marginTop: 3,
    },
};