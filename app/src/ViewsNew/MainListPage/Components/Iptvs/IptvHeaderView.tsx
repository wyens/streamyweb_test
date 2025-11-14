import React from 'react';
import { DISTANCE_BETWEEN_ITEMS, IptvHeaderRowView } from './IptvHeaderRow';
import {ViewItem} from "~/src/Base/ViewItem";
import type {IptvHeader} from "~/src/Controllers/Pages/MainPage/IptvList/IptvHeader";
import {mainBG} from "~/src/assets/styles/colors";

class IptvHeaderView extends ViewItem {
    get controller(): IptvHeader {
        return this.props.controller;
    }

    render() {
        const { setScrollRef, timeSlots , onHeaderScroll} = this.controller;
        const ready = Array.isArray(timeSlots) && timeSlots.length > 0;
        if (!ready) return null;

        return (
            <div style={styles.container}>
                <IptvHeaderRowView centered title="MOST" type="channel" />
                <div
                    ref={setScrollRef}
                    className={'scroll-x scroll-while'}
                    onScroll={onHeaderScroll}
                    onWheel={(e) => {
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                            (e.currentTarget as HTMLDivElement).scrollLeft += e.deltaY;
                        }
                    }}
                >
                    {timeSlots.map((slot: any, index: number) => (
                        <IptvHeaderRowView key={index} title={slot.title} type={slot.type} />
                    ))}
                </div>
            </div>
        );
    }
}

export { IptvHeaderView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        paddingTop: 5,
        paddingBottom: DISTANCE_BETWEEN_ITEMS,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: "sticky",
        top: 99,
        zIndex: 1010,
        backgroundColor: mainBG,
    },
    scroll: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        flex: 1,
    },
};