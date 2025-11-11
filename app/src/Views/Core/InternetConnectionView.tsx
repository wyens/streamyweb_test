import React from 'react'
import { StyleSheet, View } from "react-native";
import { COLORS } from '../../assets/styles/colors';
import { WB } from '../../assets/styles/paddings';
import { ViewItem } from "../../Base/ViewItem";
import { BASE_ICONS } from '../../Constants/icons';
import { controllers } from "../../Controllers/Controllers";
import { InternetConnection } from "../../Controllers/InternetConnection";
import { Button } from "../Components/ButtonItem";
import { Text } from "../Components/TextItem";
import { WelcomeImage } from '../Page/PageComponents/WelcomeImage';


class InternetConnectionView extends ViewItem {


    get controller(): InternetConnection{
        return this.props.controller
    }

    render(){
        const { visible, reload} = this.controller
        const visibleStyle = visible ? styles.visible : styles.hidden 
        return <View style={[styles.container, visibleStyle]}>
            <View style={[styles.mainBox]}>
                <WelcomeImage 
                    icon={BASE_ICONS.noSignal} 
                    style="noSignal"
                />
                <Text style="pageHead">No internet connection</Text>
                <Button
                    title="Reload"
                    style="confirm"
                    icon="reload"
                    onPress={reload}
                />
            </View>
        </View>
    }
}

export { InternetConnectionView }

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "none",
        zIndex: 999999,
        backgroundColor: COLORS.mainBG
    },
    visible: {
        display: "flex"
    },
    hidden: {

    },
    mainBox: {
        width: "100%",
        height: "100%",
        justifyContent:"center",
        paddingHorizontal: WB
    }
})