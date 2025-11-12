import { IptvHeaderView } from "./IptvHeaderView";
import {ViewItem} from "~/src/Base/ViewItem";
import  {IptvPageList} from "~/src/Controllers/Pages/MainPage/IptvList/IptvPageList";
import React from "react";


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
        // return <View style={styles.container}>
        //     <IptvHeaderView ref={iptvHeader.set} controller={iptvHeader} />
        //     <View style={{flex:1, flexDirection: 'row'}}>
        //         <ListView
        //             ref={iptvList.set}
        //             controller={iptvList}
        //             RightComponent={IptvRowView}
        //             customChannelsList
        //             LeftComponent={IptvChannelNameView}
        //             autoFocus={true}
        //         />
        //     </View>
        // </View>

        return (
            <div style={styles.container}>
                <IptvHeaderView ref={iptvHeader.set} controller={iptvHeader} />
                <div style={styles.row}>
                    {/*<ListView*/}
                    {/*    ref={iptvList.set}*/}
                    {/*    controller={iptvList}*/}
                    {/*    RightComponent={IptvRowView}*/}
                    {/*    LeftComponent={IptvChannelNameView}*/}
                    {/*    customChannelsList*/}
                    {/*    autoFocus*/}
                    {/*/>*/}
                </div>
            </div>
        )
    }
}

export { IptvListPageView }

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        paddingLeft: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        minHeight: 0,
    },
};