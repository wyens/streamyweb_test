import React from 'react'
import { StyleSheet, View } from 'react-native';
import { ViewItem } from "../../../Base/ViewItem";
import { ListItem } from "../../../Models/List/ListItem";


class ListItemView extends ViewItem {

    get controller(): ListItem{
        return this.props.controller
    }

    render(){
        return <View style={styles.container}>
        </View>
    }
}

export { ListItemView }

const styles = StyleSheet.create({
    container: {

    }
})