import { StyleSheet, View } from "react-native";
import { ViewItem } from "../../../../Base/ViewItem";
import { ChannelSlots } from "../../../../Controllers/Pages/HomeStack/IptvPage/ChannelSlots";
import { IptvHeaderRowView } from "./IptvHeaderRow";
import { OneSlotView } from "./OneSlotView";


class ChannelSlotsView extends ViewItem {

    get controller():ChannelSlots{
        return this.props.controller
    }

    render(){
        const { visibleSlots } = this.controller
        return <View style={styles.container}>
            {visibleSlots && visibleSlots.map((os, i)=><OneSlotView key={i} ref={os.set} controller={os}/>)}
        </View>
    }
}

export { ChannelSlotsView }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    }
})