import { Dimensions, StyleSheet, View } from "react-native";
import { ViewItem } from "../../../../Base/ViewItem";
import { IptvPageList } from "../../../../Controllers/Pages/MainPage/IptvList/IptvPageList";
import { ListView } from "../../../../Views/Components/ListView/ListView";
import { IptvRowView } from "./IptvRowView";
import { IptvHeaderView } from "./IptvHeaderView";
import { IptvChannelNameView } from "./IptvChannelNameView";
import { DISTANCE_BETWEEN_ITEMS } from "./IptvHeaderRow";


class IptvListPageView extends ViewItem {

    get controller(): IptvPageList{
        return this.props.controller
    }

    componentDidMount(): void {
        this.controller.iptvList.loadData()
        this.controller.epgModel.mount()
    }

    componentWillUnmount(): void {
        this.controller.epgModel.unmount()
    }

    render(){
        const { iptvList, iptvHeader } = this.controller
        return <View style={styles.container}>
            <IptvHeaderView ref={iptvHeader.set} controller={iptvHeader} />
            <View style={{flex:1, flexDirection: 'row'}}>
                <ListView
                    ref={iptvList.set}
                    controller={iptvList}
                    RightComponent={IptvRowView}
                    customChannelsList
                    LeftComponent={IptvChannelNameView}
                    autoFocus={true}
                />
            </View>
        </View>
    }
}

export { IptvListPageView }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10
    }
})
