import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViewItem } from '../../../Base/ViewItem';
import { List } from '../../../Models/List/List';
import { LoaderView } from '../../Core/LoaderView';
import { EmptyMessageView } from '../../Design/EmptyMessageView';
import { ListScrollView } from './ListScrollView';
import { ListTitleView } from './ListTitleView';
import { NotInitedComponent } from './NotInitedComponent';
import { menuHeight } from '../../../assets/styles/paddings';
import { FlatScrollView } from './FlatScrollView';
import { ListCustomChannelsView } from './ListCustomChannelsView';
import { DISTANCE_BETWEEN_ITEMS } from '../../../ViewsNew/MainListPage/Components/Iptvs/IptvHeaderRow';

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

  saveScrollRef = (ref:any) => {
    this._scrollRef = ref
  }

  get scrollRef(){
    return this._scrollRef
  }

  renderLeftComponent = () => {
    const {items} = this.controller
    const { LeftComponent, itemContainerStyle } = this.props
    return <>{items.map(oi=>{items && items.map((item) => <LeftComponent key={item.id} ref={item.set} controller={item} addStyles={itemContainerStyle} />)})}</>
  }

  render() {
    const { id, title, scroll, items, endLoading, isLoading, loadingCanDo, loaderRef, isEmpty, needInit, inited, horizontal } = this.controller;
    const RightComponent = this.props.RightComponent;
    const LeftComponent = this.props.LeftComponent;
    const stylesMainContainer = this.props.stylesMainContainer || {};
    const stylesListContainer = this.props.stylesListContainer || {};
    const contentContainerStyle = this.props.contentContainerStyle || {};
    const itemContainerStyle = this.props.itemContainerStyle || {};
    const isFull = this.props.isFull || false;
    if (needInit && !inited) {
      return (
        <View style={[styles.mainBox, stylesMainContainer]}>
          <NotInitedComponent message="To explore suggestions type something" />
        </View>
      );
    }
    return (
      <View style={[styles.mainBox, stylesMainContainer]}>
        <ListTitleView title={title} />
        {isLoading ? (
          <View style={[styles.container, stylesListContainer]}>
            <View style={[styles.loadingBox, stylesListContainer]}>
              <View style={styles.loading}>
                {this.props.focusable!=false && <LoaderView />}
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.container, stylesListContainer]}>

            {/* <FlatScrollView
              ref={scroll.set}
              controller={scroll}
              focusable={this.props.focusable}
              items={items}
              RightComponent={RightComponent}
              saveRef={this.saveScrollRef}
              isFull={isFull}
              isEmpty={isEmpty}
              contentContainerStyle={contentContainerStyle}
              itemContainerStyle={itemContainerStyle}
              endLoading={endLoading}
              loaderRef={loaderRef}
            /> */}
            {this.props.customChannelsList ? 
            <ListCustomChannelsView 
              ref={scroll.set} controller={scroll}
              saveRef={this.saveScrollRef}
              focusable={this.props.focusable}
              contentContainerStyle={contentContainerStyle}
              LeftComponent={<RenderLeftComponent items={items} LeftComponent={LeftComponent} itemContainerStyle={itemContainerStyle}/>}
              autoFocus={this.props.autoFocus}
            >
              {isEmpty&&this.props.focusable!=false && <EmptyMessageView submessage="Nothing to show" style="list" />}
              {items && items.map((item) => <RightComponent key={item.id} ref={item.set} controller={item} addStyles={itemContainerStyle} />)}
              {(this.props.focusable!=false && !endLoading) && (
                <View style={styles.endLoading}>
                  <LoaderView ref={loaderRef} />
                </View>
              )}
            </ListCustomChannelsView>
            : 
            <ListScrollView autoFocus={this.props.autoFocus} isFull={isFull} saveRef={this.saveScrollRef} focusable={this.props.focusable} contentContainerStyle={contentContainerStyle} ref={scroll.set} controller={scroll}>
              {isEmpty&&this.props.focusable!=false && <EmptyMessageView submessage="Nothing to show" style="list" />}
              {items && items.map((item) => <RightComponent key={`${id}_${item.id}`} ref={item.set} controller={item} addStyles={itemContainerStyle} />)}
              {(this.props.focusable!=false && !endLoading) && (
                <View style={styles.endLoading}>
                  <LoaderView ref={loaderRef} />
                </View>
              )}
            </ListScrollView>
            }
          </View>
        )}
      </View>
    );
  }
}

export { ListView };

const RenderLeftComponent = ({items, LeftComponent, itemContainerStyle}:any) => {
  return <View style={{marginRight:DISTANCE_BETWEEN_ITEMS}}>{items && items.map((item:any) => <LeftComponent key={item.id} ref={item?.setLeftRef} controller={item} addStyles={itemContainerStyle} />)}</View>
}

const styles = StyleSheet.create({
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
});
