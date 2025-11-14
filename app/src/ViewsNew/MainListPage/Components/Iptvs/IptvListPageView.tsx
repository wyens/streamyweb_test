import { IptvHeaderView } from "./IptvHeaderView";
import {ViewItem} from "~/src/Base/ViewItem";
import  {IptvPageList} from "~/src/Controllers/Pages/MainPage/IptvList/IptvPageList";
import React from "react";
import {ListView} from "~/src/Views/Components/ListView/ListView";
import {IptvRowView} from "~/src/ViewsNew/MainListPage/Components/Iptvs/IptvRowView";
import {IptvChannelNameView} from "~/src/ViewsNew/MainListPage/Components/Iptvs/IptvChannelNameView";


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
        return (
            <div style={styles.container}>
                <IptvHeaderView ref={iptvHeader.set} controller={iptvHeader} />
                <div style={styles.row}>
                    <ListView
                        ref={iptvList.set}
                        controller={iptvList}
                        RightComponent={IptvRowView}
                        LeftComponent={IptvChannelNameView}
                        customChannelsList
                        autoFocus
                    />
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
        paddingLeft: 5,
        height: "100%",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        minHeight: 0,
    },
};