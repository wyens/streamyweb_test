import React, { useRef, useEffect } from 'react';
import { ViewItem } from '~/src/Base/ViewItem';
import { IptvChannel } from '~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel';


const ROW_H = 118;
const THUMB_W = 180;
const THUMB_H = Math.round((THUMB_W * 9) / 16);

export class NewIptvRowView extends ViewItem {
  get controller(): IptvChannel {
    return this.props.controller;
  }

  render() {
    const { title, selectedEpg, selected, setFocusItem, thumbnail, generateThumbnail, channelHash, onLoadedThumbnail, visible, onPressItem } = this.controller;

    if (!visible) {
      return null;
    }
      return null;
    return (
      // <View style={styles.container}>
      //   <PressableFocusView setFocusItem={setFocusItem} focused={selected} style={[styles.wrap]} channel={this.controller}>
      //     <View style={styles.card}>
      //       <IptvChannelNameView controller={this.controller}/>
      //       {/* {selected && <View pointerEvents="none" style={styles.selectedBg} />}
      //       {selected && <View pointerEvents="none" style={styles.selectedStroke} />} */}
      //
      //       <View style={styles.thumbWrap}>
      //         {/* {thumbnail ? ( */}
      //         <ChannelThumbnail saveAbortSignal={controllers().abortControl.setAbortSignal} onLoaded={() => {}} channelToken={channelHash} />
      //         {/* ) : (
      //           <ThumbSkeleton />
      //         )} */}
      //       </View>
      //
      //       <View style={styles.meta}>
      //         {!!selectedEpg?.betweens && (
      //           <Text customStyle={styles.timeText} numberOfLines={1}>
      //             {selectedEpg.betweens}
      //           </Text>
      //         )}
      //         <Text customStyle={styles.title} numberOfLines={2}>
      //           {selectedEpg?.name ?? title}
      //         </Text>
      //       </View>
      //     </View>
      //   </PressableFocusView>
      // </View>
    );
  }
}


//
// const styles = StyleSheet.create({
//   container: {
//     height: ROW_H,
//     width: '100%',
//     marginBottom: 10,
//     flex: 1,
//   },
//   wrap: {
//     borderRadius: 15,
//     backgroundColor: '#2D333D',
//     width: '100%',
//   },
//
//   card: {
//     position: 'relative',
//     height: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 18,
//     overflow: 'hidden',
//   },
//
//   selectedBg: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//   },
//   selectedStroke: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 18,
//     borderWidth: 2,
//     borderColor: 'rgba(255,255,255,0.9)',
//   },
//
//   thumbWrap: {
//     width: THUMB_W,
//     height: THUMB_H,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     marginRight: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   thumbSkeleton: {
//     width: THUMB_W,
//     height: THUMB_H,
//   },
//
//   meta: {
//     flex: 1,
//     minWidth: 0,
//   },
//
//   timeText: {
//     fontSize: 14,
//     opacity: 0.75,
//     marginBottom: 4,
//   },
//
//   title: {
//     fontSize: 20,
//     fontWeight: '700' as any,
//   },
// });
