import React from 'react';
import { ScrollView, StyleSheet, TVFocusGuideView } from 'react-native';
import { ViewItem } from '../../../../Base/ViewItem';
import { IptvHeader } from '../../../../Controllers/Pages/MainPage/IptvList/IptvHeader';
import { DISTANCE_BETWEEN_ITEMS, IptvHeaderRowView } from './IptvHeaderRow';

class IptvHeaderView extends ViewItem {
  get controller(): IptvHeader {
    return this.props.controller;
  }

  render() {
    const { setScrollRef, timeSlots } = this.controller;
    const ready = Array.isArray(timeSlots) && timeSlots.length > 0;
    if (!ready) {
      return null;
    }
    return (
      <TVFocusGuideView focusable={false} style={styles.container}>
        <IptvHeaderRowView centered title="MOST" type="channel" />
        <ScrollView
          horizontal
          style={styles.scroll}
          showsHorizontalScrollIndicator={false}
          ref={setScrollRef}
          onFocus={() => console.error('FOCUS CAPTURED ON SCROLL')}
        >
          {timeSlots.map((slot: any, index: any) => (
            <IptvHeaderRowView key={index} title={slot.title} type={slot.type} />
          ))}
        </ScrollView>
      </TVFocusGuideView>
    );
  }
}

export { IptvHeaderView };

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: DISTANCE_BETWEEN_ITEMS,
    flexDirection: 'row',
  },
  scroll: {
    gap: 5,
    flexDirection: 'row',
  },
});
