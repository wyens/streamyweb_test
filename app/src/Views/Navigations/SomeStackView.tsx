import { View } from "react-native";
import { ViewItem } from "../../Base/ViewItem";
import { Text } from "../Components/TextItem";

class SomeStackView extends ViewItem {

    render(){
        return <View>
            <Text>Hello</Text>
        </View>
    }
}

export { SomeStackView }