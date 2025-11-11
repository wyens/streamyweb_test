import React from 'react';
import { Animated, StyleSheet, TVFocusGuideView, View } from 'react-native';
import { ViewItem } from '../../../Base/ViewItem.tsx';
import { ControllerEPG } from '../../../Models/ControllerControlsVideo/EPGList/ControllerEPG.ts';
import { EpgView } from '../../Screens/MainStack/IptvPage/EpgView.tsx';

export class EPGList extends ViewItem {
  get controller(): ControllerEPG {
    return this.props.controller;
  }

  render() {
    const isVisible = this.controller.isVisible;
    const pointerEvents = isVisible ? 'auto' : 'none';

    if(!isVisible){
      return null
    }
    return (
      <Animated.View
        ref={this.controller.set}
        pointerEvents={pointerEvents}
        style={[StyleSheet.absoluteFill, styles.overlay, { opacity: this.controller.opacity }]}
      >
        <TVFocusGuideView focusable isTVSelectable style={styles.panel}>
          <EpgView ref={this.controller.epgModel.set} controller={this.controller.epgModel} />
        </TVFocusGuideView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 9999,
    elevation: 9999,
    justifyContent: 'flex-end',
  },
  panel: {
    width: '100%',
    height: '66%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
});
