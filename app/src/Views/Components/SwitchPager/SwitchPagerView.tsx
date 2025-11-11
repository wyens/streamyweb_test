import React from "react";
import { StyleSheet, View } from "react-native";
import { ViewItem } from "../../../Base/ViewItem";
import { SwitchPager } from "../../../Models/Switcher/SwitchPager";


type switchPagerProps = {
    component?: any;
    children?: any;
    RightComponent?: any;
    controller?: any;
    navigation?: any;
    styles?: any;
    ActivePage: any;
    EpgPage: any
}
class SwitchPagerView extends ViewItem {
    props: switchPagerProps

    constructor(props:switchPagerProps){
        super(props)
        this.props = props
    }

    get controller(): SwitchPager{
        return this.props.controller
    }

    render() {
        const { currentType } = this.controller
        const { EpgPage, ActivePage } = this.props
        return <View style={styles.container}>
            {currentType === "epg" ? EpgPage : ActivePage}
        </View>
    }
}

export { SwitchPagerView }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})