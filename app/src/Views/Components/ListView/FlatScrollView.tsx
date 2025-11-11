import { FlatList, ScrollView, StyleSheet, TVFocusGuideView, View } from "react-native";
import { ViewItem, viewItemProps } from "../../../Base/ViewItem";
import { ListScroll } from "../../../Models/List/ListScroll";
import { RefreshControl } from "react-native-gesture-handler";
import { LOADERCOLOR } from "../../../assets/styles/colors";
import { EmptyMessageView } from "../../Design/EmptyMessageView";
import { LoaderView } from "../../Core/LoaderView";

type listScrollProps = viewItemProps & {
  focusable?: boolean;
  saveRef: (ref: any) => void;
  isFull?: boolean;
  contentContainerStyle?:any;
  items: any;
  itemContainerStyle?:any;
  isEmpty?: any;
  endLoading?: boolean;
  loaderRef?:any
};

class FlatScrollView extends ViewItem {
    props: listScrollProps;
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

    setSaveScrollRef = (ref: any) => {
        this.props.saveRef(ref);
        this.controller.setScrollRef(ref);
    };

    render(){
        const { setScrollRef, scrollRefresh, onScroll, onScrollHorizontal, onLayout, horizontal, pagingEnabled } = this.controller;
        const { RightComponent, items, itemContainerStyle, isEmpty, endLoading, loaderRef} = this.props
        scrollRefresh.set(this);
        let contentContainerStyle = this.props.contentContainerStyle || {};
        let isFull = this.props.isFull ? styles.w100 : {};
        return <TVFocusGuideView style={styles.scroll} focusable={this.props.focusable} autoFocus>
                {/* Outer vertical ScrollView - keeps vertical scrolling capability */}
                <ScrollView
                    refreshControl={
                        scrollRefresh.refreshing ? (
                            <RefreshControl
                            refreshing={scrollRefresh.refreshing}
                            onRefresh={scrollRefresh.onRefresh}
                            tintColor={LOADERCOLOR}
                            colors={[LOADERCOLOR]}
                            />
                        ) : undefined
                    }
                    horizontal
                    onScroll={onScrollHorizontal}
                    style={styles.scroll}
                    contentContainerStyle={contentContainerStyle}
                    scrollEventThrottle={20}
                    onLayout={onLayout}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* Inner horizontal FlatList - optimized horizontal scrolling */}
                    <FlatList
                        ref={this.setSaveScrollRef}
                        data={items || []}
                        removeClippedSubviews={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <RightComponent
                            key={item.id}
                            ref={item.set}
                            controller={item}
                            addStyles={itemContainerStyle}
                            />
                        )}
                        onScroll={onScroll}
                        scrollEventThrottle={20}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={isFull}
                        ListEmptyComponent={
                            isEmpty && this.props.focusable !== false ? (
                            <EmptyMessageView submessage="Nothing to show" style="list" />
                            ) : null
                        }
                        ListFooterComponent={
                            this.props.focusable !== false && !endLoading ? (
                            <View style={styles.endLoading}>
                                <LoaderView ref={loaderRef} />
                            </View>
                            ) : null
                        }
                    />
                </ScrollView>
                </TVFocusGuideView>
    }

}

export { FlatScrollView }

const styles = StyleSheet.create({
    scroll: {
    flex: 1,
  },
  w100: {
    width: '100%',
  },
  mainBox: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    // backgroundColor: 'green',
    maxHeight: 430
  },
  loading: {
    width: 100,
    height: 50,
    // backgroundColor: "red"
  },
  endLoading: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
