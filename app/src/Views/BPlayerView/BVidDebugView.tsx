import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ViewItem } from "../../Base/ViewItem";
import { BVidDebug } from "../../Models/BPlayer/BVidDebug";


class BVidDebugView extends ViewItem {

    get controller():BVidDebug{
        return this.props.controller
    }

    render() {
        const { items, on } = this.controller
        if(!on){
            return <></>
        }
        return <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {items && items.map(item => <Text style={{color: "white"}} key={item.name}>{item.name}: 
                    {typeof item.value === 'object' && item.value !== null 
                    ? JSON.stringify(item.value) 
                    : String(item.value ?? '')}
                </Text>)}
            </ScrollView>
        </View>
    }
}

export { BVidDebugView }

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 999999,
        backgroundColor: "rgba(0,0,0,.4)",
        top: 0,
        right: 0,
        width: "50%",
        height: 200
    },
    scroll: {

    }
})