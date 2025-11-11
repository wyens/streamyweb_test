import { ReactNode } from "react";
import { ViewItem } from "../../Base/ViewItem";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { ICONS, PLAYERICONS } from "../../Constants/icons";
import { COLORS, MAIN_THEME_COLOR, TEXTCOLORS } from "../../assets/styles/colors";
import { BController } from "../../Models/BPlayer/BController";
import { WB, WM, WS } from "../../assets/styles/paddings";
import { Text } from "../Components/TextItem";
import { BTimeLineView } from "./BTimeLineView";
import { TimelineView } from "./TimelineView";
import { controllers } from "../../Controllers/Controllers";
import { initialWindowMetrics } from 'react-native-safe-area-context';

class BControllerView extends ViewItem {

    get controller():BController{
        return this.props.controller
    }
    render() {
        const { imShowed, playing, isLive, timeline, showMe, hideMe, playStop, toggleFullscreen, isFullScreen} = this.controller
        const saLayout = controllers().media.asLayoutFullScreen;
        const {w, h} = controllers().media.screen
        const isFullScreenStyle = isFullScreen ? [styles.isFullScreen, {width: w, height: h}] : {}
        const isFullButton = isFullScreen ? [styles.isFullButton, {bottom:styles.isFullButton.bottom + (initialWindowMetrics?.insets.bottom||0)} ] : {};
        const isFullMini = isFullScreen ? [styles.isFullMini, {bottom:styles.isFullMini.bottom + (initialWindowMetrics?.insets.bottom||0)}] : {}
        return false
        return <View style={[styles.container, isFullScreenStyle]}>
            {imShowed ? <View style={styles.totalContainer}>
                <View style={styles.backPressable}>
                    <Pressable style={{flex: 1}} onPress={hideMe}/>
                </View>
                <Pressable style={styles.playButton} onPress={playStop}>
                    <Image
                        source={!playing ? PLAYERICONS.playMini : PLAYERICONS.pause}
                        style={styles.playButtonIcon}
                    />
                </Pressable>
                {isLive ? <View style={[styles.playButtonMini, isFullMini]}>
                    {/* <View style={styles.lived}/> */}
                    {/* <Text customStyle={styles.livedText}>Live</Text> */}
                </View> : <BTimeLineView/>}
                <Pressable style={[styles.fullScreenButton, isFullButton]} onPress={toggleFullscreen}>
                    <Image
                        source={PLAYERICONS.fullscreen}
                        style={styles.fullScreenButtonIcon}
                    />
                </Pressable>
                {!isLive && <TimelineView ref={timeline.set} controller={timeline} />}
            </View> : <Pressable style={styles.onlyPressable} onPress={showMe}/>}
        </View>
    }
}

export { BControllerView }

const styles = StyleSheet.create({
    isFullScreen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        overflow: "hidden"
        // height: Dimensions.get("window").height,
        // height: "100%",
        // height: "100%",
        // minHeight: Dimensions.get('window').width,
    },
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        // width: Dimensions.get('screen').width,
        // height: "100%",
        // height: 200,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 900,
        // backgroundColor: "red"
    },
    onlyPressable: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    totalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backPressable: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        // width: Dimensions.get('screen').width,
        height: Dimensions.get("screen").height,
        backgroundColor: "rgba(0,0,0,.4)",
        // backgroundColor: "red",
        zIndex: 1090
    },
    playButton: {
        position: "absolute",
        width: 50,
        height: 50,
        // backgroundColor: "red",
        borderRadius: 100,
        // backgroundColor: MAIN_THEME_COLOR,
        zIndex: 1100,
        justifyContent: "center",
        alignItems: "center",
        // marginLeft: -25,
        // marginTop: -25
    },
    playButtonIcon: {
        width: 20,
        height: 20,
        // marginLeft: 3,
        // resizeMode: "cover",
        // backgroundColor: "red"
    },
    isFullButton: {
        right: 25,
        bottom: 20
    },
    isFullMini: {
        left: 25,
        bottom: 30
    },
    fullScreenButton: {
        position: "absolute",
        // top: 0,
        right: WB,
        // backgroundColor:"red",
        bottom: 0,
        zIndex: 1110,
        // backgroundColor: "red",
        width: 40,
        height: 40,
        justifyContent:"center",
        alignItems: "center"
    },
    fullScreenButtonIcon: {
        width: 20,
        height: 20
    },
    playButtonMini: {
        position: "absolute",
        left: WB,
        bottom: WB,
        zIndex: 1110,
        flexDirection: "row",
        alignItems: "center"
    },
    lived: {
        width: 10,
        height: 10,
        backgroundColor: TEXTCOLORS.cancel,
        borderRadius: 50
    },
    livedText: {
        marginLeft: WS,
        fontSize: 10
    },
    playButtonMiniIcon: {
        width: 25,
        height: 25
    }
})
