import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { ChannelSlots } from "~/src/Controllers/Pages/HomeStack/IptvPage/ChannelSlots";
import { OneSlotView } from "./OneSlotView";

class ChannelSlotsView extends ViewItem {
    get controller():ChannelSlots {
        return this.props.controller;
    }

    render() {
        const { visibleSlots } = this.controller;
        return (
            <div style={styles.container}>
                {visibleSlots &&
                    visibleSlots.map((os, i) => (
                        <OneSlotView key={i} ref={os.set} controller={os} />
                    ))}
            </div>
        );
    }
}

export { ChannelSlotsView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "row",
        flex: "1 1 auto",
    },
};