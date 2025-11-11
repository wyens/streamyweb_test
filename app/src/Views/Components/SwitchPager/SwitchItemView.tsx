import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "../TextItem";
import { WB, WM, WS } from "../../../assets/styles/paddings";
import { FONTS } from "../../../assets/styles/fonts";
import { hometabs } from "../../../Controllers/Pages/HomeStack/IptvPage/IptvPageModel";

type propsSwitchItem = {
    title: string;
    type: hometabs;
    onPress: (title: hometabs)=>void;
}

class SwitchItemView extends React.Component {
    props: propsSwitchItem
    constructor(props: propsSwitchItem){
        super(props)
        this.props = props
    }

    onPressItem = () => {
        this.props.onPress(this.props.type)
    }
    render() {
        const { title } = this.props
        return <View style={styles.container}>
            <Pressable style={styles.pressable} onPress={this.onPressItem}>
                <Text customStyle={styles.text}>{title}</Text>
            </Pressable>
        </View>
    }
}

export {SwitchItemView}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pressable: {
        width: "100%",
        padding: WM,
        justifyContent: 'center',
        alignItems: "center",
    },
    text: {
        fontFamily: FONTS.bold
    },
})