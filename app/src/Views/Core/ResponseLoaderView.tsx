import React from "react"
import { Modal, StyleSheet, View } from "react-native";
import { COLORS } from "../../assets/styles/colors";
import { ViewItem } from "../../Base/ViewItem";
import { ResponseLoader } from "../../Controllers/ResponseLoader";
import { Button } from "../Components/ButtonItem";
import { LoaderView } from "./LoaderView";

class ResponseLoaderView extends ViewItem {

    get controller(): ResponseLoader {
        return this.props.controller
    }
    render() {
        const { visible, setLoader, loaderCanDo } = this.controller
        const visibleStyle = visible ? styles.visible : styles.hidden
        return <View style={[styles.container, visibleStyle]}>
                <View style={styles.containerBox}>
                    <View style={styles.loaderBox}>
                        <LoaderView ref={setLoader}/>
                    </View>
                </View>
            </View>
    }
}

export { ResponseLoaderView }

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
        // backgroundColor: COLORS.ALERTMODALCOLOR,
        width: 80,
        height: 80,
        borderRadius: 10,
        transform:  [{ rotate: "45deg" }]
    },
    loaderBox: {
        transform:  [{ rotate: "-45deg" }]
    }
})