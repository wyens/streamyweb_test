import { ReactNode } from "react";
import { ViewItem } from "../../Base/ViewItem";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "../Components/TextItem";
import { GoBackScreen } from "../Components/GoBackScreen";
import { WB, WM, WS } from "../../assets/styles/paddings";
import { PageHeader } from "./PageHeader";
import { COLORS } from "../../assets/styles/colors";


class PageHeaderView extends ViewItem {

    get controller(): PageHeader {
        return this.props.controller
    }

    componentDidMount(): void {
        if(this.controller.automount){
            this.controller.onMountMe()
        }
    }
    componentWillUnmount(): void {
        if(this.controller.automount){
            this.controller.unmountMe()
        }
    }

    render(): ReactNode {
        const { RightComponent } = this.props
        const { onGoBack, title, visible, hidden } = this.controller
        if(hidden){
            return null;
        }
        const visibleHeader = visible ? styles.visibleHeader : {}
        return <View style={[styles.header]}>
            <GoBackScreen onPress={onGoBack} roundBoxStyle={!visible}/>
            <View style={[styles.backBox, visibleHeader]}>
                {visible && <Text stylesText={styles.headerText} numberOfLines={1} style="pageHead">
                    {title}
                </Text>}
                <View style={styles.rightComponent}>
                    {RightComponent && RightComponent}
                </View>
            </View>
      </View>
    }
}

export { PageHeaderView }

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1500,
        height: 40
    },
    visibleHeader: {
        backgroundColor: COLORS.mainBG
    },
    headerText: {
        // marginLeft: 10,
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 0,
        maxWidth: Dimensions.get("screen").width*0.8
    },
    rightComponent: {
        position: "absolute",
        right: WM,
    },
    backBox: {
        flex: 1,
        height: 40,
        alignItems: "center"
    }
})