import { ViewItem } from "../../../../Base/ViewItem";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { IptvChannel } from "../../../../Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import { Text } from "../../../Components/TextItem";
import { WB, WM, WS } from "../../../../assets/styles/paddings";
import { FONTS } from "../../../../assets/styles/fonts";
import { COLORS } from "../../../../assets/styles/colors";
import FastImage from "react-native-fast-image";


class IptvItemView extends ViewItem {

    get controller(): IptvChannel{
        return this.props.controller
    }
    render(){
        const { title, icon, onPressItem, selected, epg} = this.controller
        // console.error(title)
        const selectedStyle = selected ? styles.selected : {}
        const selectedEpgText = selected ? styles.selectedEpgText : {}
        return <View style={styles.container}>
            <Pressable onPress={onPressItem}>
                <View style={[styles.wholebox, selectedStyle]}>
                    <View style={styles.iconBox}>
                        <FastImage 
                            source={{uri: icon, priority: FastImage.priority.normal}}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </View>
                    <Text customStyle={styles.title}>{title}</Text>
                    <View style={styles.epgBox}>
                        {epg.selectedItem && <View style={styles.epgWholeBox}>
                            <Text customStyle={styles.time}>{epg.selectedItem.time}</Text>
                            <Text customStyle={[styles.name, selectedEpgText]}>{epg.selectedItem?.name}</Text>
                        </View>}
                    </View>
                </View>
            </Pressable>
        </View>
    }
}

export { IptvItemView }

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor:"red",
        // height: 20,
        // width: 100
    },
    pressable: {
        flex: 1
    },
    wholebox: {
        flex: 1,
        paddingVertical: WS,
        paddingHorizontal: WB,
        backgroundColor: "#2D3031",
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: "contain"
    },
    iconBox: {
        marginRight: WB
    },
    title: {
        fontFamily: FONTS.bold
    },
    selected: {
        backgroundColor: "#CAB502"
    },
    epgBox: {
        flex: 1
    },
    epgWholeBox: {
        flexDirection: "column",
        alignItems: "flex-end",
        paddingLeft: WM
    },
    time: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: "white"
    },
    name: {
        fontSize: 12,
        color: "hsl(0,0%,75%)",
        fontFamily: FONTS.semi,
        textAlign: "right"
    },
    selectedEpgText: {
        color: "hsl(0,0%,20%)"
    }
})