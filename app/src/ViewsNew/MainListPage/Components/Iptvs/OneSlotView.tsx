import React from "react";
import { IptvHeaderRowView } from "./IptvHeaderRow";
import { OneTimeSlot } from "../../../../Controllers/Pages/HomeStack/IptvPage/OneTimeSlot";
import { ViewItem } from "../../../../Base/ViewItem";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../../Views/Components/TextItem";
import { FONTS } from "../../../../assets/styles/fonts";

class OneSlotView extends ViewItem {

    get controller():OneTimeSlot{
        return this.props.controller
    }
    render(){
        const { title, allEpgs, channel, slotTakes, focusedTimeSlot} = this.controller
        // console.log("allEpgs", allEpgs)
        return <IptvHeaderRowView
                    type="secondaryepg"
                    // centered
                    pressable
                    channel={channel}
                    slotTakes={slotTakes}
                    onFocusAddition={focusedTimeSlot}
                    >
                    {allEpgs && allEpgs.map((oei:any, jindex:any) => (
                        <View key={`${channel.id}_${jindex}_${oei.timeCost}`} style={{width: 150}}>
                            <Text customStyle={styles.endsSoon}>{oei!.betweens}</Text>
                            <Text customStyle={styles.secondaryepg}>{oei!.name}</Text>
                        </View>
                    ))}
        </IptvHeaderRowView>
    }
}

export { OneSlotView }


const styles = StyleSheet.create({

    endsSoon: {
        color: "#A29F9F",
        fontSize: 12,
        fontFamily: FONTS.regular
    },
    secondaryepg: {
        color: "#A29F9F",
        // fontWeight: 600,
        flexWrap: "wrap",
        fontSize: 14,
        fontFamily: FONTS.medium,
        marginTop: 3
    },
})