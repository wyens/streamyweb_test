import { ViewItem } from "~/src/Base/ViewItem";
import { IptvChannel } from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";



class IptvChannelNameView extends ViewItem {

    get controller(): IptvChannel{
        return this.props.controller
    }

    render(){
        const { title, icon, onPressItem, selected, epg, visible, favoriteStatus} = this.controller
        if(!visible){
            return null
        }
        return null
        // console.log("icon",icon)
        // return <View style={styles.container}>
        //         <IptvHeaderRowView
        //         type="channel"
        //         isMainColor
        //         centered
        //         >
        //             <FastImage
        //                 source={{uri: icon}}
        //                 style={styles.icon}
        //                 resizeMode="contain"
        //             />
        //             {favoriteStatus && <Image source={ICONS.starDefault} style={styles.favorite}/>}
        //         </IptvHeaderRowView>
        // </View>
    }
}

export { IptvChannelNameView }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         // alignItems: "center"
//         marginBottom: DISTANCE_BETWEEN_ITEMS,
//         height: Dimensions.get("screen").height*.2
//     },
//     icon: {
//         height: 70,
//         width: 70,
//         resizeMode: "contain",
//         // tintColor: '#D9D9D9',
//     },
//     scroll: {
//         // gap: 5
//     },
//     previewChannel: {
//         width: 160,
//         height: 90,
//         resizeMode: "contain"
//     },
//     mainepgContainer: {
//         flexDirection: "row",
//         alignItems: "center"
//     },
//     mainepgTexts: {
//
//     },
//     endsSoon: {
//         color: "#A29F9F",
//         fontSize: 12
//     },
//     secondaryepg: {
//         color: "#A29F9F",
//         fontWeight: 600
//     },
//     mainepgTitle: {
//         fontWeight: 600
//     },
//     favorite: {
//         width: 15,
//         height: 15,
//         position: "absolute",
//         left: 5,
//         top: 5
//     }
// })