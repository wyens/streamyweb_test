// GlobalFocusTracker.js
import React, { Component } from 'react';
import { View, StyleSheet, TVEventHandler } from 'react-native';

class FocusOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedComponent: null
    };
    this.tvEventHandler = null;
  }

  componentDidMount() {
    this.tvEventHandler = new TVEventHandler();
    this.tvEventHandler.enable(this, (cmp, evt) => {
      if (evt.eventType === 'focus') {
        // Component gained focus
        this.setState({ focusedComponent: evt.tag });
      }
    });
  }

  componentWillUnmount() {
    if (this.tvEventHandler) {
      this.tvEventHandler.disable();
    }
  }

  render() {
    return this.props.children;
  }
}

export { FocusOverlay }