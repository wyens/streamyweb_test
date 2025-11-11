import React from 'react';
import { ScrollView, StyleSheet, TVFocusGuideView } from 'react-native';
import { ViewItem } from '../../../../Base/ViewItem';
import { MainCategory } from '../../../../Controllers/Pages/MainPage/MainCategory/MainCategory';
import { OneCategoryView } from './OneCategoryView.tsx';
import { CategoryLineView } from './CategoryLineView.tsx';

class MainCategoriesView extends ViewItem {
  get controller(): MainCategory {
    return this.props.controller;
  }

  componentDidMount(): void {
    this.controller.loadCategories();
  }

  render() {
    const { items, categoryLine, scrollFocused, scrollBlured, trapFocusDown } = this.controller;
    // console.log("TRAP FOCUS DOWN", trapFocusDown)
    // const ready = Array.isArray(items) && items.length > 0;
    // console.log('ready', ready, items);

    // if (!ready) {
    //   return null;
    // }
    return (
      <TVFocusGuideView
        style={styles.container}
        onFocus={scrollFocused}
        onBlur={scrollBlured}
        autoFocus
        trapFocusDown={trapFocusDown}
        hasTVPreferredFocus={true}
      >
        <ScrollView horizontal style={styles.itemsContainer} showsHorizontalScrollIndicator={false}>
          {items && items.map((oi, i) => <OneCategoryView key={`${oi.id}_${oi.keyId}`} ref={oi.set} controller={oi} />)}
          <CategoryLineView ref={categoryLine.set} controller={categoryLine} />
        </ScrollView>
      </TVFocusGuideView>
    );
  }
}

export { MainCategoriesView };

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // backgroundColor: "red"
  },
  itemsContainer: {
    flexDirection: 'row',
    // paddingTop: 20,
    paddingLeft: 10,
    // backgroundColor: "red",
    width: '100%',
    borderColor: '#2C2F42',
    borderBottomWidth: 1,
    // backgroundColor: 'red'
  },
});
