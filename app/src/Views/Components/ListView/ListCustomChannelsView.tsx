import React from "react";
import {ViewItem, type viewItemProps} from "~/src/Base/ViewItem";
import type {ListScroll} from "~/src/Models/List/ListScroll";


type listScrollProps = viewItemProps & {
    focusable?: boolean;
    saveRef: (ref: any) => void;
    isFull?: boolean;
    LeftComponent: any;
    contentContainerStyle?:any
    autoFocus?: boolean;
};
class ListCustomChannelsView extends ViewItem {
    props;
    _outerRef = null;
    _innerRef = null;

    constructor(props:listScrollProps) {
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

    setSaveScrollRef = (ref) => {
        this._outerRef = ref;
        this.props.saveRef?.(ref);
        this.controller.setScrollRef?.(ref);
        if (ref && this.controller.onLayout) {
            const rect = ref.getBoundingClientRect();
            this.controller.onLayout({ nativeEvent: { layout: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } } });
        }
    };

    setInnerRef = (ref) => {
        this._innerRef = ref;
    };

    handleInnerWheel = (e) => {
        if (!this._innerRef) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            this._innerRef.scrollLeft += e.deltaY;
        }
    };

    render() {
        const { setScrollRef, scrollRefresh, onScroll, onScrollHorizontal, onLayout, horizontal, pagingEnabled } = this.controller;
        const contentContainerStyle = this.props.contentContainerStyle || {};
        const isFull = this.props.isFull ? styles.w100 : {};
        const { LeftComponent } = this.props;

        return (
            <div
                style={styles.scroll}
                ref={this.setSaveScrollRef}
                tabIndex={this.props.focusable ? 0 : -1}
                data-autofocus={this.props.autoFocus ? "true" : "false"}
                onScroll={onScroll}
            >
                <div style={styles.row}>
                    <div>{LeftComponent}</div>

                    <div
                        ref={this.setInnerRef}
                        style={{ ...styles.innerHorizontal, ...isFull, ...contentContainerStyle }}
                        onScroll={onScrollHorizontal}
                        onWheel={this.handleInnerWheel}
                    >
                        <div style={{ ...isFull }}>{this.props.children}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export { ListCustomChannelsView };

const styles: Record<string, React.CSSProperties> = {
    scroll: {
        display: "flex",
        flex: "1 1 auto",
        overflow: "auto",
        minHeight: 0,
    },
    w100: {
        width: "100%",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flex: "1 1 auto",
        minWidth: 0,
    },
    innerHorizontal: {
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        overflowY: "hidden",
        flex: "1 1 auto",
        minHeight: 0,
        minWidth: 0,
    },
};