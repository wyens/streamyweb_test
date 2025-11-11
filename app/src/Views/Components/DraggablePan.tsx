import React from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from "react-native";
import { buttonHeight } from "../../assets/styles/paddings";
import { controllers } from "../../Controllers/Controllers";

type dragableProps = {
    children?: any
}
type dragableState = {
    pan: Animated.ValueXY
}

class DraggablePan extends React.Component {
    props: dragableProps
    state: dragableState
    _val = {x: 0, y: 0}
    panResponder: any = null
    constructor(props: dragableProps) {
        super(props);
        this.props = props
        this.state = {
            pan: new Animated.ValueXY()
        };
    }

  componentDidMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => {
        // console.log(value)
        this._val = value
    });
    const ev = this
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove:  Animated.event([null, { dx: ev.state.pan.x}], {useNativeDriver: false}),
      onPanResponderEnd: ()=>{
        this.state.pan.setValue({ x:0, y:0})
      }
    });
    this.forceUpdate()
  }

  limits = (value: Animated.Value) => {
    console.log(value)
    return this._val.x < 0 ? new Animated.Value(200) : this._val.x > controllers().media.w*0.8 ? new Animated.Value(controllers().media.w*0.8) : value
  }

  render() {
    if(this.panResponder === null){
        return null
    }
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, styles.circle]}
        >
            {this.props.children}
        </Animated.View>
    );
  }
}

export { DraggablePan }
let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {

    // backgroundColor: "skyblue",
    width: 30,
    height: buttonHeight,
    // borderRadius: CIRCLE_RADIUS
  }
});