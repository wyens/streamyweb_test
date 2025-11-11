import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./TextItem";
import { FONTS } from "../../assets/styles/fonts";
import { COLORS } from "../../assets/styles/colors";
import { WB } from "../../assets/styles/paddings";

type titleLineProps = {
    title?: string;
}

class TitleLine extends React.Component {
    props: titleLineProps
    constructor(props:titleLineProps){
        super(props)
        this.props = props
    }

    render() {
        const { title } = this.props
        return <View style={[styles.container]}>
                {title && <Text stylesText={[styles.title, styles.ph]}>{title}</Text>}
                <View style={styles.line} />
            </View>
    }
}

export { TitleLine }

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.WHITE,
    },
    ph: {
        paddingHorizontal: WB,
    },
    line: {
        height: 1,
        backgroundColor: COLORS.BORDER_GRAY_COLOR,
        width: '100%',
        marginTop: 5,
    },
})