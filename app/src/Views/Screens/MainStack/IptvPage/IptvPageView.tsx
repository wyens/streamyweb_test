import { ReactNode } from "react";
import { ViewItem } from "../../../../Base/ViewItem";
import { Dimensions, StyleSheet, View } from "react-native";
import { BPlayerView } from "../../../BPlayerView/BPlayerView";
import { IptvPageModel } from "../../../../Controllers/Pages/HomeStack/IptvPage/IptvPageModel";
import { List } from "../../../../Models/List/List";
import { ListView } from "../../../Components/ListView/ListView";
import { IptvItemView } from "./IptvItemView";
import { Text } from "../../../Components/TextItem";
import { SwitcherView } from "../../../Components/SwitchPager/SwitcherView";
import { SwitchPagerView } from "../../../Components/SwitchPager/SwitchPagerView";
import { EpgView } from "./EpgView";
import { PlayerAccessView } from "../PlayerAccess/PlayerAccessView";
import { controllers } from "../../../../Controllers/Controllers";
import { menuHeight } from "../../../../assets/styles/paddings";
import { initialWindowMetrics } from "react-native-safe-area-context";

export const StatusHeight = initialWindowMetrics?.insets?.bottom || 0;

class IptvPageView extends ViewItem {

    get controller(): IptvPageModel{
        return this.props.controller
    }
    componentDidMount(): void {
        this.controller.iptvList.loadData()
    }
    render() {
        const { bPlayer, iptvList, switcher, pager, epg} = this.controller
        const {isLandscape, screen} = controllers().media
        const landscapeStyle = isLandscape ? styles.landscape : {};
        const landscapePlayerStyle = isLandscape ? styles.landscapePlayer : {};
        const landscapeList = isLandscape ? styles.landscapeList : {};
        return <View style={[styles.container, landscapeStyle]}>
            <View style={[styles.playercontainer, landscapePlayerStyle]}>
                {/* <PlayerAccessView> */}
                    <BPlayerView ref={bPlayer.set} controller={bPlayer}/>
                {/* </PlayerAccessView> */}
            </View>
            <View style={[styles.listcontainer,landscapeList]}> 
                <SwitcherView ref={switcher.set} controller={switcher}/>
                <SwitchPagerView 
                    ref={pager.set} 
                    controller={pager}
                    ActivePage={<ListView
                        ref={iptvList.set}
                        controller={iptvList}
                        RightComponent={IptvItemView}
                    />}
                    EpgPage={<EpgView ref={epg.set} controller={epg}/>}
                />
            </View>
        </View>
    }
}

export { IptvPageView }

const styles = StyleSheet.create({
    container: {
        // minHeight: Dimensions.get("window").height-55
        flex: 1,
        // backgroundColor:'green'
    },
    landscape: {
        flexDirection: "row-reverse",
        maxHeight: Dimensions.get("screen").height-100
    },
    landscapePlayer: {
        flex: 1
    },
    landscapeList: {
        minWidth: 200,
        minHeight: 200,
        maxWidth: 350,
        flex: 0,
        width: "35%"
    },
    listcontainer: {
        flex: 1,
        // paddingBottom: menuHeight+90
    },
    playercontainer: {
        // flex: 1
        zIndex: 1000,
        minHeight: 200
    }
})
