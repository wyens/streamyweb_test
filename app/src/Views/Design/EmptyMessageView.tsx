import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, buttonItemProps } from '../Components/ButtonItem';
import { Text } from '../Components/TextItem';
import { XB } from '../../assets/styles/paddings';
import { COLORS } from '../../assets/styles/colors';

type emptyMessageProps = {
    message?: string;
    submessage?: string;
    button?: buttonItemProps;
    style?: "list"
}
class EmptyMessageView extends React.Component {
    props: emptyMessageProps
    constructor(props: emptyMessageProps){
        super(props)
        this.props = props
    }
    render(){
        const { message, submessage, button, style} = this.props
        const styleBox = style ? styles[style] : {}
        return <View style={[styles.container, styleBox]}>
            {message && <Text style='pageHead'>{message}</Text>}
            {submessage && <Text center>{submessage}</Text>}
            {button && <Button {...button}/>}
        </View>
    }
}

export { EmptyMessageView }

const styles = StyleSheet.create({
    container: {
        // backgroundColor: COLORS.RIDE_SHINE,
        paddingVertical: XB
    },
    list: {
        backgroundColor: "none",
        // backgroundColor: "red",
        minHeight: 100,
        justifyContent: "center",

    }
})