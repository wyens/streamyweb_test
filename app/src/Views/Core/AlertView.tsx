import React from "react"
import { Dimensions, StyleSheet, View } from "react-native";
import { COLORS } from "../../assets/styles/colors";
import { WB, WM, WS } from "../../assets/styles/paddings";
import { ViewItem } from "../../Base/ViewItem";
import { BASE_ICONS } from "../../Constants/icons";
import { AlertController } from "../../Controllers/AlertController";
import { IconButton } from "../Components/IconButton";
import { SmallIcon } from "../Components/SmallIcon";
import { Text } from "../Components/TextItem";


class AlertView extends ViewItem {

    get controller(): AlertController {
        return this.props.controller
    }

    render() {
        const { visible, title, message, hide} = this.controller
        const visibleStyle = visible ? styles.visible : styles.hidden
        return <View style={[styles.container, visibleStyle]}>
                {/* <View style={styles.closeBox}><TouchableOpacity style={styles.closeTouchable} onPress={hide}></TouchableOpacity></View> */}
                <View style={styles.containerBox}>
                    <View style={styles.alert}>
                        <View style={styles.alertContainer}>
                            <View style={styles.alertHeader}>
                                <View style={styles.alertHeaderTitle}>
                                    <Text style="alertTitle">{title}</Text>
                                </View>
                                <View style={styles.closeButtBox}>
                                    <SmallIcon
                                        onPress={hide}
                                        source={BASE_ICONS.close}
                                        style="sm"
                                    />
                                </View>
                            </View>

                            <View style={styles.alertBody}>
                                <Text style="alertMessage" center>{message}</Text>
                            </View>
                        </View>
                    </View>
                </View>
        </View>
    }
}

export { AlertView }


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: 0,
        width: 0,
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,.3)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    visible: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        zIndex: 99999,
    },
    hidden: {},
    containerBox: {

    },
    alert: {
        width: Dimensions.get('screen').width*0.8,
        backgroundColor: COLORS.ALERTMODALCOLOR,
        borderRadius: 5,
    },
    alertContainer: {},
    closeButtBox: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: 0,
        top: 2
    },
    alertHeader: {
        width: '100%',
        justifyContent: "center",
        flexDirection:'row',
        paddingVertical: WS,
    },
    alertHeaderTitle: {
        justifyContent: 'center',
        alignItems: "center",
        flex: 1
    },
    alertBody: {
        paddingHorizontal: WM,
        paddingVertical: WB
    },
    closeBox: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        // backgroundColor: "red",
    },
    closeTouchable: {
        // backgroundColor: "red",
        height: '100%'
    }
})