import React from "react";
import { ViewItem } from "~/src/Base/ViewItem";
import { LoaderView } from "../../Core/LoaderView";
import { EmptyMessageView } from "../../Design/EmptyMessageView";
import { ListScrollView } from "./ListScrollView";
import { ListTitleView } from "./ListTitleView";
import { NotInitedComponent } from "./NotInitedComponent";
import { ListCustomChannelsView } from "./ListCustomChannelsView";
import { DISTANCE_BETWEEN_ITEMS } from "~/src/ViewsNew/MainListPage/Components/Iptvs/IptvHeaderRow";
import type {List} from "~/src/Models/List/List";

type listViewProps = {
    controller: List;
    stylesMainContainer?: any;
    stylesListContainer?: any;
    contentContainerStyle?: any;
    itemContainerStyle?: any;
    RightComponent?: any;
    isFull?: boolean;
    focusable?: boolean;
    customChannelsList?: boolean;
    LeftComponent?:any
    autoFocus?: any;
};

class ListView extends ViewItem {
    props: listViewProps;
    _scrollRef: any;

    constructor(props: listViewProps) {
        super(props);
        this.props = props;
    }
    get controller(): List {
        return this.props.controller;
    }

    saveScrollRef = (ref) => {
        this._scrollRef = ref;
    };
    get scrollRef() {
        return this._scrollRef;
    }

    render() {
        const {
            id,
            title,
            scroll,
            items,
            endLoading,
            isLoading,
            loaderRef,
            isEmpty,
            needInit,
            inited,
            horizontal,
        } = this.controller;

        const RightComponent = this.props.RightComponent;
        const LeftComponent = this.props.LeftComponent;
        const stylesMainContainer = this.props.stylesMainContainer || {};
        const stylesListContainer = this.props.stylesListContainer || {};
        const contentContainerStyle = this.props.contentContainerStyle || {};
        const itemContainerStyle = this.props.itemContainerStyle || {};
        const isFull = this.props.isFull || false;

        if (needInit && !inited) {
            return (
                <div style={{ ...styles.mainBox, ...stylesMainContainer }}>
                    <NotInitedComponent message="To explore suggestions type something" />
                </div>
            );
        }

        return (
            <div style={{ ...styles.mainBox, ...stylesMainContainer }}>
                <ListTitleView title={title} />
                {isLoading ? (
                    <div style={{ ...styles.container, ...stylesListContainer }}>
                        <div style={{ ...styles.loadingBox, ...stylesListContainer }}>
                            <div style={styles.loading}>
                                {this.props.focusable !== false && <LoaderView />}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ ...styles.container, ...stylesListContainer }}>
                        {this.props.customChannelsList ? (
                            <ListCustomChannelsView
                                ref={scroll.set}
                                controller={scroll}
                                saveRef={this.saveScrollRef}
                                focusable={this.props.focusable}
                                contentContainerStyle={contentContainerStyle}
                                LeftComponent={
                                    <RenderLeftComponent
                                        items={items}
                                        LeftComponent={LeftComponent}
                                        itemContainerStyle={itemContainerStyle}
                                    />
                                }
                                autoFocus={this.props.autoFocus}
                            >
                                {isEmpty && this.props.focusable !== false && (
                                    <EmptyMessageView submessage="Nothing to show" style="list" />
                                )}
                                {items &&
                                    items.map((item) => (
                                        <RightComponent
                                            key={item.id}
                                            ref={item.set}
                                            controller={item}
                                            addStyles={itemContainerStyle}
                                        />
                                    ))}
                                {this.props.focusable !== false && !endLoading && (
                                    <div style={styles.endLoading}>
                                        <LoaderView ref={loaderRef} />
                                    </div>
                                )}
                            </ListCustomChannelsView>
                        ) : (
                            <ListScrollView
                                autoFocus={this.props.autoFocus}
                                isFull={isFull}
                                saveRef={this.saveScrollRef}
                                focusable={this.props.focusable}
                                contentContainerStyle={contentContainerStyle}
                                ref={scroll.set}
                                controller={scroll}
                            >
                                {isEmpty && this.props.focusable !== false && (
                                    <EmptyMessageView submessage="Nothing to show" style="list" />
                                )}
                                {items &&
                                    items.map((item) => (
                                        <RightComponent
                                            key={`${id}_${item.id}`}
                                            ref={item.set}
                                            controller={item}
                                            addStyles={itemContainerStyle}
                                        />
                                    ))}
                                {this.props.focusable !== false && !endLoading && (
                                    <div style={styles.endLoading}>
                                        <LoaderView ref={loaderRef} />
                                    </div>
                                )}
                            </ListScrollView>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export { ListView };

const RenderLeftComponent = ({ items, LeftComponent, itemContainerStyle }) => {
    if (!LeftComponent || !items) return null;
    return (
        <div style={{ marginRight: DISTANCE_BETWEEN_ITEMS }}>
            {items.map((item) => (
                <LeftComponent
                    key={item.id}
                    ref={item?.setLeftRef}
                    controller={item}
                    addStyles={itemContainerStyle}
                />
            ))}
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    mainBox: {
        display: "flex",
        flex: "1 1 auto",
        minHeight: 0,
        overflow: 'hidden'
    },
    container: {
        display: "flex",
        flex: "1 1 auto",
        minHeight: 0,
    },
    loadingBox: {
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 100,
        maxHeight: 430,
    },
    loading: {
        width: 100,
        height: 50,
    },
    endLoading: {
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};