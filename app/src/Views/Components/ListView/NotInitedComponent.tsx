import React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "../TextItem"
import { XXB } from "../../../assets/styles/paddings";
import { FONTS } from "../../../assets/styles/fonts";

type notInitedProps = { 
    message: string;
    style?: string;
}

class NotInitedComponent extends React.Component {
    props: notInitedProps
    constructor(props:notInitedProps){
        super(props)
        this.props = props
    }
    render(){
        const {message} = this.props
        return <View style={styles.container}>
            <Text customStyle={styles.textMessage}>{message}</Text>
        </View>
    }
}

export { NotInitedComponent }

const styles = StyleSheet.create({
    textMessage: {
        fontSize: 18,
        fontFamily: FONTS.black
    },
    container: {
        flex: 1,
        // backgroundColor: 'red',
        paddingBottom: 80,
        justifyContent: "center",
        alignItems: 'center'
    },
})