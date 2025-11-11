import React from "react";
import { RefreshControl } from "react-native"
import { LOADERCOLOR } from "../../../assets/styles/colors";
import { LoaderView } from "../../Core/LoaderView";

type Props = {
    onRefreshAction: ()=>Promise<any>,
};

export const ScrollRefreshConst: React.FC<Props> = ({onRefreshAction}) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        // setRefreshing(true);
        // setTimeout(()=>{
        //     console.error("END TIMEOUt")
        //     setRefreshing(false)
        // }, 5000)
        // await onRefreshAction()
        // clear selected user
        setRefreshing(true);
        await onRefreshAction()
    }
    return <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[LOADERCOLOR]}
    />
}