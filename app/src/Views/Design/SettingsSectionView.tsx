import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BORDERCOLOR, COLORS } from '../../assets/styles/colors';
import { WB, WS } from '../../assets/styles/paddings';
import { Text } from '../Components/TextItem'

type settingsSectionProps = {
    children?: any;
    title: string;
}

class SettingsSectionView extends React.Component {
    props: settingsSectionProps
    constructor(props: settingsSectionProps){
        super(props)
        this.props = props
    }

    render(){
        const { title, children } = this.props
        return <View style={styles.container}>
            <View style={styles.titleBox}><Text style='inputTitle'>{title}</Text></View>
            <View style={styles.items}>{children}</View>
        </View>
    }
}

export { SettingsSectionView }

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: COLORS.RIDE_BORDER_SHINE,
        marginTop: WB,
        marginBottom: 3
    },
    titleBox: {
        paddingHorizontal: WB
    },
    items: {

    }
})
