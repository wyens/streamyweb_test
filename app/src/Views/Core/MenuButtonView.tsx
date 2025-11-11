import { ReactNode } from "react";
import { ViewItem } from "../../Base/ViewItem";
import { StyleSheet, View } from "react-native";
import { Text } from "../Components/TextItem";

class MenuButtonView extends ViewItem {

    get controller(){
        return this.props.controller
    }

    render() {
        const { title } = this.props.controller
        return <View style={styles.container}>
            <Text>{title}</Text>
        </View>
    }
}

export { MenuButtonView }

const styles = StyleSheet.create({
    container: {

    }
})