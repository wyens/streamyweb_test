import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type { EpgModel } from "~/src/Controllers/Pages/HomeStack/IptvPage/EpgModel";
import { CurrentEpgListView } from "./CurrentEpgListView";

class EpgView extends ViewItem {
    get controller(): EpgModel {
        return this.props.controller;
    }

    render() {
        const { selectedItem } = this.controller;

        return (
            <div style={styles.container}>
                {selectedItem && (
                    <CurrentEpgListView
                        ref={selectedItem.epg.set as any}
                        controller={selectedItem.epg}
                    />
                )}
            </div>
        );
    }
}

export { EpgView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
};