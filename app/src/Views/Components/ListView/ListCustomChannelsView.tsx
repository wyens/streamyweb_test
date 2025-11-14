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
        this.controller.setInnerRef(ref)
    };

    // handleInnerWheel = (e) => {
    //     if (!this.controller.innerRef) return;
    //     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    //         this.controller.innerRef.scrollLeft += e.deltaY;
    //     }
    // };

    render() {
        const { setScrollRef, scrollRefresh, onScroll, onScrollHorizontal, onLayout, horizontal, pagingEnabled } = this.controller;
        const contentContainerStyle = this.props.contentContainerStyle || {};
        const isFull = this.props.isFull ? styles.w100 : {};
        const { LeftComponent } = this.props;

        return (
            <div
                className={'scroll-x'}
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
                        onScroll={onScrollHorizontal}
                        // onWheel={this.handleInnerWheel}
                        style={styles.innerHorizontal}
                    >
                        <div className={'w100'}>{this.props.children}</div>
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
        height: '100%',
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
        maxWidth: "100%",
        whiteSpace: "nowrap",
    },
};