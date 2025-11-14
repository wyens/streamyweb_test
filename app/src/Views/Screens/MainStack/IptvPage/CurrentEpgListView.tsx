import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type { EpgList } from "~/src/Controllers/Pages/HomeStack/IptvPage/EpgList";
import {EpgItemView} from "~/src/Views/Screens/MainStack/IptvPage/EpgItemView";

class CurrentEpgListView extends ViewItem {
    get controller(): EpgList {
        return this.props.controller;
    }
    componentDidMount(): void {
        this.controller.scrollToCurrentItem();
    }

    render() {
        const { items, setScrollRef } = this.controller;

        return (
            <div style={styles.container}>
                <div style={styles.scroll} className={'scroll-x'} ref={setScrollRef}>
                    {items?.map((epg, i) => (
                        <EpgItemView key={`${i}_${epg.timeCost}`} ref={epg.set} controller={epg} />
                    ))}
                </div>
            </div>
        );
    }
}

export { CurrentEpgListView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    scroll: {
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        paddingRight: 10,
        boxSizing: "border-box",
        width: "100%",
    },
};