import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../Components/TextItem";

type loaderProps = {
    color?: string
}
class LoaderView extends React.Component<loaderProps> {
    render(){
        const {color} = this.props
        const colorStyle = color!==undefined ? {color:color} : {}
        return <View style={[styles.container]}>
            <Text customStyle={colorStyle}>Loading ...</Text>
        </View>
    }
}

export { LoaderView }

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
})