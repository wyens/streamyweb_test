import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../Components/TextItem";
import { Button } from "../../../Components/ButtonItem";
import { navigator } from "../../../../Controllers/Navigation";
import { WB, WM, WS } from "../../../../assets/styles/paddings";


class NoPaymentView extends React.Component {

    navigateToProfile = () => {
        navigator().navigate("Subscription")
    }
    render(){
        return <View style={styles.container}>
            <Text customStyle={styles.text}>To get full access for watching, please continue payment on you profile</Text>
            <Button
                onPress={this.navigateToProfile}
                title="Pay now"
                style="suit"
            />
        </View>
    }
}

export { NoPaymentView }

const styles = StyleSheet.create({
    container: {
        height: 250,
        justifyContent: "center",
        padding: WB,
        backgroundColor: "black"
    },
    text: {
        textAlign: "center",
        paddingBottom: WB
    }
})