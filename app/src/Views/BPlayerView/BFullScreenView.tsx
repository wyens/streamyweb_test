import { Dimensions, Modal, StyleSheet, View } from "react-native";
import { ViewItem } from "../../Base/ViewItem";
import { BFullScreen } from "../../Models/BPlayer/BFullScreen";
import { controllers } from "../../Controllers/Controllers";


class BFullScreenView extends ViewItem {

    get controller():BFullScreen{
        return this.props.controller
    }
    render(){
        const { children } = this.props
        const { enabled } = this.controller
        const enabledFullScreen = enabled ? styles.enabledFullScreen : {}
        const saLayout = controllers().media.asLayoutFullScreen;
        const enabledFullScreenBox = enabled ? [styles.enabledFullScreenBox, saLayout] : {}
        if(enabled){
            return <Modal visible={true} transparent={false} presentationStyle="fullScreen">
                <View style={styles.mainContainer}>
                    {children}
                </View>
            </Modal>
        }
        return <View style={[styles.container, enabledFullScreen]}>
            <View style={[styles.containerBox,enabledFullScreenBox]}>
                <View style={styles.insideContainer}>
                    {children}
                </View>
            </View>
        </View>
    }
}

export { BFullScreenView }

const styles = StyleSheet.create({
    mainContainer: {
        // height: Dimensions.get("screen").height,
        // width: 100,
        // height: 100,
        // backgroundColor: "red"
    },
    container: {
        width: "100%",
        height: "100%",
        // overflow: "hidden"
        // height: 200,
        // flex: 1
        // overflow: "hidden"
        // backgroundColor: "red"
    },
    containerBox: {
        width: "100%",
        // height: 100,
        overflow: "hidden"
    },
    enabledFullScreen: {
        // position: "absolute",
        left:0,
        right:0,
        top:0,
        bottom:0,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        zIndex: 9999999,
        justifyContent: "center",
        alignItems: "center",
    },
    enabledFullScreenBox: {
        // width: Dimensions.get("screen").height,
        // height: Dimensions.get("screen").width,
        // top: -50,
        // backgroundColor: "red"
    },
    insideContainer: {
        width: "100%",
        height: "100%",
        // backgroundColor: "green"
        // width: Dimensions.get("screen").height,
        // height: Dimensions.get("screen").width,
        // backgroundColor: "red"
    }
})