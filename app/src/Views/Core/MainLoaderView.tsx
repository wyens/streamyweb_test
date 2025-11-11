import React from 'react';
import { StyleSheet, View } from "react-native";
import { mainBG } from '../../assets/styles/colors';
import { ViewItem } from "../../Base/ViewItem";
import { LoaderController } from "../../Controllers/LoaderController";
import { LoaderView } from "./LoaderView";


class MainLoaderView extends ViewItem {
    
    get controller(): LoaderController {
        return this.props.controller
    }

    render(){
        const { visible, loadingCanDo, loaderRef} = this.controller
        const visibleStyle = visible ? styles.visible : {}
        return <View style={[styles.container, visibleStyle]}>
            <LoaderView ref={loaderRef}/>
        </View>
    }
}

export { MainLoaderView }

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
        // display: "none"
    },
    visible: {
        display: "flex",
        zIndex: 9999,
        backgroundColor: mainBG
    }
})