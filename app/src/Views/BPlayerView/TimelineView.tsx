import { Dimensions, StyleSheet, View } from "react-native";
import { ViewItem } from "../../Base/ViewItem";
import { Text } from "../Components/TextItem";
import { BTimeLine } from "../../Models/BPlayer/BTimeLine";
import { WB, WM, WS } from "../../assets/styles/paddings";
// import { Slider } from '@react-native-assets/slider'
import { MAIN_THEME_COLOR } from "../../assets/styles/colors";

class TimelineView extends ViewItem {

    get controller(): BTimeLine{
        return this.props.controller
    }
    render(){
        const { currentTime, showingTime, handleTimeUpdate, onSlidingStart, onSlidingComplete, duration, player } = this.controller
        const isFullScreen = player.bController.isFullScreen
        const isFullTimeline = isFullScreen ? styles.isFullTimeline : {}
        const isFullSlider = isFullScreen ? styles.isFullSlider : {}
        const isFullSliderComponent = isFullScreen ? styles.isFullSliderComponent : {}
        return <View style={[styles.container, isFullTimeline]}>
            <View style={styles.timeComponent}><Text customStyle={styles.currentTime}>{showingTime}</Text></View>
            <View style={[styles.sliderComponent,isFullSliderComponent]}>
                {/* <Slider
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration}
                    style={isFullSlider}
                    vertical={isFullScreen}
                    onValueChange={handleTimeUpdate}
                    onSlidingStart={onSlidingStart}
                    onSlidingComplete={onSlidingComplete}
                    minTrackStyle={{backgroundColor:MAIN_THEME_COLOR}}
                    minimumTrackTintColor="rgba(255,255,255,.8)" // Track color before thumb
                    maximumTrackTintColor="rgba(255,255,255,.2)" // Track color after thumb
                    thumbTintColor="rgba(255,255,255,1)" // Thumb color
                /> */}
            </View>
        </View>
    }
}

export { TimelineView }

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        bottom: WM,
        right: 70,
        zIndex: 1500,
        flexDirection: "row",
        alignItems: "center"
    },
    isFullTimeline: {
        left: 70,
        right: 150,
        bottom: 30,
    },
    isFullSlider: {
        width: 200,
        height: Dimensions.get('screen').height*0.67,
        // marginRight: WM,
        transform: [{ rotate: '-90deg' }],
        // transform: [{ rotate: '-90deg' }],
    },
    isFullSliderComponent: {
        overflow: "hidden",
        // backgroundColor: "red",
        height: 20,
        width: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    currentTime: {
        fontSize: 10
    },
    timeComponent: {
        marginHorizontal: WM,
        width: 50,
        alignItems: "center"
    },
    sliderComponent: {
        flex: 1,
        paddingLeft: WM
    },
    // handleTimeChange: {

    // }
})