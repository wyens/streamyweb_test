import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import type {ListScroll} from "~/src/Models/List/ListScroll";

type listScrollProps = {
    controller: any;
    focusable?: boolean;
    saveRef: (ref: any) => void;
    isFull?: boolean;
    contentContainerStyle?: any;
    autoFocus?: boolean;
    children?: any;
};

class ListScrollView extends ViewItem {
    props: listScrollProps;
    _outerRef: HTMLDivElement | null = null;
    _innerRef: HTMLDivElement | null = null;

    constructor(props: listScrollProps) {
        super(props);
        this.props = props;
    }

    get controller(): ListScroll {
        return this.props.controller;
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        this.controller.removeListeners();
    }

    setSaveScrollRef = (ref: HTMLDivElement | null) => {
        this._outerRef = ref;
        this.props.saveRef(ref);
        this.controller.setScrollRef(ref);

        if (ref && this.controller.onLayout) {
            const r = ref.getBoundingClientRect();
            this.controller.onLayout({
                nativeEvent: { layout: { x: r.x, y: r.y, width: r.width, height: r.height } },
            });
        }
    };

    setInnerRef = (ref: HTMLDivElement | null) => {
        this._innerRef = ref;
    };

    handleInnerWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        if (!this._innerRef) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            this._innerRef.scrollLeft += e.deltaY;
        }
    };

    render() {
        const { setScrollRef, scrollRefresh, onScroll, onScrollHorizontal, onLayout, horizontal, pagingEnabled } =
            this.controller;

        const contentContainerStyle = this.props.contentContainerStyle || {};
        const isFull = this.props.isFull ? styles.w100 : {};

        return (
            <div
                style={styles.scroll}
                ref={this.setSaveScrollRef}
                tabIndex={this.props.focusable ? 0 : -1}
                data-autofocus={this.props.autoFocus ? "true" : "false"}
                onScroll={onScroll}
            >
                <div
                    ref={this.setInnerRef}
                    style={{ ...styles.innerHorizontal, ...isFull, ...contentContainerStyle }}
                    onScroll={onScrollHorizontal}
                    onWheel={this.handleInnerWheel}
                >
                    <div style={{ ...isFull }}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export { ListScrollView };

export const styles: Record<string, React.CSSProperties> = {
    scroll: {
        display: "flex",
        flex: "1 1 auto",
        minHeight: 0,
        overflow: "auto",
    },
    innerHorizontal: {
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        overflowY: "hidden",
        flex: "1 1 auto",
        minWidth: 0,
        minHeight: 0,
    },
    w100: {
        width: "100%",
    },
};