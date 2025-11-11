import React from 'react'
import { StyleSheet, View } from "react-native";
import { WB, WS } from '../../../assets/styles/paddings';
import { Text } from '../TextItem';
import { TEXTCOLORS } from '../../../assets/styles/colors';

type listTitleProps = { 
    title?: string;

}
class ListTitleView extends React.Component {
    props: listTitleProps
    constructor(props: listTitleProps){
        super(props)
        this.props = props
    }
    render(){
        const { title } = this.props
        if(!title){
            return null
        }
        return <View style={styles.container}>
            <Text style='listTitle'>{title}</Text>
        </View>
    }
}

export { ListTitleView }

const styles = StyleSheet.create({
    container: {
        borderBottomColor: TEXTCOLORS.secondary,
        borderBottomWidth: 1,
        paddingHorizontal: WB,
        paddingBottom: WS
    },

})