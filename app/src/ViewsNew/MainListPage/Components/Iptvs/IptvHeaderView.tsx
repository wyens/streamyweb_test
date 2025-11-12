import React from 'react';
import { DISTANCE_BETWEEN_ITEMS, IptvHeaderRowView } from './IptvHeaderRow';
import {ViewItem} from "~/src/Base/ViewItem";
import type {IptvHeader} from "~/src/Controllers/Pages/MainPage/IptvList/IptvHeader";

class IptvHeaderView extends ViewItem {
    get controller(): IptvHeader {
        return this.props.controller;
    }

    render() {
        const { setScrollRef, timeSlots } = this.controller;
        const ready = Array.isArray(timeSlots) && timeSlots.length > 0;
        if (!ready) return null;

        return (
            <div style={styles.container}>
                <IptvHeaderRowView centered title="MOST" type="channel" />
                <div
                    ref={setScrollRef}
                    style={styles.scroll}
                    // onWheel={(e) => {
                    //     // коліщатко вниз -> горизонтальний скрол
                    //     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    //         (e.currentTarget as HTMLDivElement).scrollLeft += e.deltaY;
                    //         e.preventDefault();
                    //     }
                    // }}
                    onFocusCapture={() => console.error('FOCUS CAPTURED ON SCROLL')}
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
        paddingTop: 10,
        paddingBottom: DISTANCE_BETWEEN_ITEMS,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
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