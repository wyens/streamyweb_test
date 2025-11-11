import React from "react";
import { Text } from "~/src/Views/Components/TextItem";
import { PressableFocusView } from "./PressableFocusView";
import { FONTS } from "~/src/assets/styles/fonts";


export const DISTANCE_BETWEEN_ITEMS = 3;

type iptvHeaderRowProps = {
    title?: string;
    type?: "channel"|"mainepg"|"secondaryepg";
    children?: any;
    isMainColor?: any;
    centered?:boolean;
    pressable?:boolean;
    noMargin?: boolean;
    channel?:any;
    autoFocus?:boolean;
    noPadding?: boolean;
    focused?:boolean;
    slotTakes?:number;
    onFocusAddition?: ()=>void;
    onBlurAddition?: ()=>void;
}
class IptvHeaderRowView extends React.Component<iptvHeaderRowProps> {

    render(){
        return (
            null
        )
        // const { title, type, children, isMainColor, centered, pressable, noMargin, noPadding, channel, autoFocus, onFocusAddition, onBlurAddition, slotTakes} = this.props
        // const componentStyle = type ? styles[type] : {}
        // const componentColor = type && !children ? styles[`${type}_color`] : {}
        // const colorMain = isMainColor ? styles.mainBackground : styles.secondaryBackground
        // const centeredStyle = centered ? styles.centered : {}
        // const noMarginStyles = noMargin ? {marginLeft: 0} : {}
        // const noPaddingStyles = noPadding ? {padding:0} : styles.defaultPadding
        // const slotTakesStyle = slotTakes ? {width: Dimensions.get("screen").width*.2*slotTakes+(DISTANCE_BETWEEN_ITEMS)*(slotTakes-1)} : {}
        // if(pressable){
        //     return <PressableFocusView focused={this.props.focused} onFocusAddition={onFocusAddition} onBlurAddition={onBlurAddition} autoFocus={autoFocus} channel={channel} style={[[styles.container, centeredStyle, colorMain, componentStyle, componentColor, noMarginStyles, noPaddingStyles, slotTakesStyle]]}>
        //             {children ? children : <Text customStyle={styles.text}>{title}</Text>}
        //         </PressableFocusView>
        // }
        // return <View style={[[styles.container, centeredStyle, colorMain, componentStyle, componentColor, noMarginStyles, noPaddingStyles, slotTakesStyle]]}>
        //     {children ? children : <Text customStyle={styles.text}>{title}</Text>}
        // </View>
    }
}

export { IptvHeaderRowView }


// const styles = StyleSheet.create({
//     container: {
//         // padding: 10,
//         borderRadius: 3,
//         justifyContent: "center"
//     },
//     defaultPadding: {
//         padding: 10,
//     },
//     centered: {
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     channel: {
//         // backgroundColor: "#196FFD",
//         minWidth: Dimensions.get("screen").width*.10
//     },
//     mainepg: {
//         marginLeft: DISTANCE_BETWEEN_ITEMS,
//         minWidth: Dimensions.get("screen").width*.35
//     },
//     secondaryepg: {
//         marginLeft: DISTANCE_BETWEEN_ITEMS,
//         minWidth: Dimensions.get("screen").width*.2
//     },
//
//     channel_color: {
//         backgroundColor: "#196FFD",
//     },
//     mainepg_color: {
//         backgroundColor: "#196FFD",
//     },
//     secondaryepg_color: {
//         backgroundColor: "#3C424F",
//     },
//     mainBackground: {
//         backgroundColor: "#2D333D",
//     },
//     secondaryBackground: {
//         backgroundColor: "#242830"
//     },
//     text: {
//         fontFamily: FONTS.semi,
//         fontSize: 14
//     }
// })
