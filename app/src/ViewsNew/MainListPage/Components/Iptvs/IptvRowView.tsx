import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ViewItem, viewItemProps } from "../../../../Base/ViewItem";
import { ListItem } from "../../../../Models/List/ListItem";
import { IptvChannel } from "../../../../Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import { Text } from "../../../../Views/Components/TextItem";
import FastImage from "react-native-fast-image";
import { DISTANCE_BETWEEN_ITEMS, IptvHeaderRowView } from "./IptvHeaderRow";
import { ScrollView } from "react-native-gesture-handler";
import { DEMOITEMS, ICONS } from "../../../../Constants/icons";
import { ChannelThumbnail } from './ThumbnailView'
import { timeParse } from "../../../../Helpers/DateTime";
import { controllers } from "../../../../Controllers/Controllers";
import { TimeSlotView } from "./TimeSlotView";
import { ChannelSlotsView } from "./ChannelSlotsView";
import { FONTS } from "../../../../assets/styles/fonts";


class IptvRowView extends ViewItem {

    get controller(): IptvChannel{
        return this.props.controller
    }

    render(){
        const { title, selectedEpg, channelSlots,  icon, onPressItem, selected, epg, thumbnail, generateThumbnail, focusedType, channelHash, onLoadedThumbnail, visible} = this.controller

        if(!visible){
            return null
        }
        return <View style={[styles.container]}>
                <IptvHeaderRowView 
                    type="mainepg"
                    isMainColor
                    // centered
                    pressable
                    noMargin
                    noPadding
                    channel={this.controller}
                    // onFocusAddition={}
                    focused={selected}
                    onFocusAddition={()=>{
                        focusedType(true)
                        generateThumbnail()
                    }}
                    onBlurAddition={focusedType}
                    
                >
                    <View style={styles.mainepgContainer}>
                        {thumbnail && <ChannelThumbnail saveAbortSignal={controllers().abortControl.setAbortSignal} onLoaded={onLoadedThumbnail} channelToken={channelHash}/>}
                        <View style={styles.mainepgTexts}>
                            <Text customStyle={styles.endsSoon}>{selectedEpg?.betweens}</Text>
                            <Text customStyle={styles.mainepgTitle} numberOfLines={3}>{selectedEpg?.name}</Text>
                        </View>
                    </View>
                </IptvHeaderRowView>
                {channelSlots && <ChannelSlotsView ref={channelSlots.set} controller={channelSlots}/>}
        </View>
    }
}

export { IptvRowView }

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // alignItems: "center"
        marginBottom: DISTANCE_BETWEEN_ITEMS,
        height: Dimensions.get("screen").height*.2
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: "contain"
    },
    scroll: {
        // gap: 5
    },
    previewChannel: {
        width: 160,
        height: 90,
        resizeMode: "contain"
    },
    mainepgContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 5
        // backgroundColor: "red"
    },
    mainepgTexts: {
        flex: 1,
        width: 100,
    },
    endsSoon: {
        color: "#A29F9F",
        fontSize: 12,
        fontFamily: FONTS.regular
    },
    secondaryepg: {
        color: "#A29F9F",
        fontWeight: 600,
        flexWrap: "wrap"
    },
    mainepgTitle: {
        // fontWeight: 600,
        flexWrap: 'wrap',
        fontSize: 14,
        fontFamily: FONTS.medium,
        marginTop: 3
    }
})