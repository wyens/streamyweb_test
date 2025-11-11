import React from 'react'
import { StyleSheet, View } from "react-native";
import { WB, WM, WS } from '../../../assets/styles/paddings';
import { ViewItem } from "../../../Base/ViewItem";
import { INPUT_ICONS } from '../../../Constants/icons';
import { SearchableSelector } from "../../../Models/SearchableSelector/SearchableSelector";
import { PageSuit } from '../../Page/PageSuit';
import { Input } from "../InputItem";
import { ListView } from "../ListView/ListView";


class SearchableSelectorView extends ViewItem {

    get controller():SearchableSelector {
        return this.props.controller
    }

    componentDidMount() {
        this.controller.list.loadData()
    }

    render(){
        const {RightComponent} = this.props
        const { list, onSearchChange} = this.controller
        return <PageSuit customKeyboard keyboard withoutScroll>
            <View style={styles.inputBox}>
                <Input
                    type="text"
                    placeholder="Type something ..."

                    icon={{
                        source: INPUT_ICONS.search,
                        order: 0
                    }}
                    style="leftIcon"
                    clearingInput
                    // focus
                    onChangeValue={onSearchChange}
                />
            </View>
            <View style={{paddingVertical: WM}}/>
            <ListView
                ref={list.set}
                controller={list}
                RightComponent={RightComponent}
            />
        </PageSuit>
    }
}

export { SearchableSelectorView }

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: WB,
        paddingTop: WS,
         flex: 1
    },
    listContainer: {
        // backgroundColor: "green",
        // flex: 1,
        // height: 50,
    },
    inputBox: {
        paddingHorizontal: WB
    }
})
