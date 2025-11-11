import React from "react";
import { ViewItem, viewItemProps } from "../../../../Base/ViewItem";
import { IptvHeaderRowView } from "./IptvHeaderRow";
import { Text } from "../../../../Views/Components/TextItem";
import { StyleSheet, View } from "react-native";

type timeSlotProps = viewItemProps & {
    timeSlots: any;
    allNextEpgs: any;
    channel:any
}

class TimeSlotView extends React.Component<timeSlotProps> {
    
    shouldComponentUpdate(nextProps: Readonly<timeSlotProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false
    }
    render(){
        const { timeSlots, allNextEpgs, channel} = this.props
        const renderedSlots:any = [];
        let skipCount = 0;

        timeSlots.forEach((slot:any, index:number) => {
                // Skip slots that are already covered by a previous multi-slot item
                if (skipCount > 0) {
                    skipCount--;
                    return;
                }

                // Find all EPG items that overlap with this slot
                const overlappingItems:any = allNextEpgs.filter((oei:any) => 
                    oei.timeCost > slot.timeCost
                ).slice(0,1);

                if (overlappingItems.length === 0) {
                    // No items for this slot, render empty
                    renderedSlots.push(
                        <IptvHeaderRowView
                        key={`${index}_${slot.title}`}
                        type="secondaryepg"
                        centered
                        pressable
                        />
                    );
                } else if (overlappingItems.length === 1 && overlappingItems[0].timeCost === slot.timeCost) {
                    // Single item that starts at this slot
                    const item:any = overlappingItems[0];
                    const duration = item.timeCostEnd - item.timeCost;
                    const slotTakes = Math.ceil(duration / 30); // 30 minutes per slot
                    
                    skipCount = slotTakes - 1; // Skip next slots covered by this item

                    renderedSlots.push(
                        <IptvHeaderRowView
                        key={`${index}_${slot.title}_${item.timeCost}`}
                        type="secondaryepg"
                        centered
                        pressable
                        channel={channel}
                        slotTakes={slotTakes}
                        >
                        <View style={{width: 150}}>
                            <Text customStyle={styles.endsSoon}>{item?.betweens}</Text>
                            <Text customStyle={styles.secondaryepg}>{item?.name}</Text>
                        </View>
                        </IptvHeaderRowView>
                    );
                } else {
                // Multiple items or item doesn't start at this slot
                    renderedSlots.push(
                        <IptvHeaderRowView
                        key={`${index}_${slot.title}`}
                        type="secondaryepg"
                        centered
                        pressable
                        channel={channel}
                        >
                        {overlappingItems.map((oei:any, jindex:any) => (
                            <View key={`${index}_${jindex}_${oei.timeCost}`} style={{width: 150}}>
                                <Text customStyle={styles.endsSoon}>{oei?.betweens}</Text>
                                <Text customStyle={styles.secondaryepg}>{oei?.name}</Text>
                            </View>
                        ))}
                        </IptvHeaderRowView>
                    );
                }
            });

            return renderedSlots;
    }
}

export { TimeSlotView }

const styles = StyleSheet.create({

    endsSoon: {
        color: "#A29F9F",
        fontSize: 12
    },
    secondaryepg: {
        color: "#A29F9F",
        fontWeight: 600,
        flexWrap: "wrap"
    },
})