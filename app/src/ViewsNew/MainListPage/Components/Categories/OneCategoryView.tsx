
import { Pressable, StyleSheet, TouchableHighlight, View } from "react-native";
import { ViewItem } from "../../../../Base/ViewItem";
import { Text } from "../../../../Views/Components/TextItem";
import { navigator } from "../../../../Controllers/Navigation";
import { FONTCOLOR, TEXTCOLORS } from "../../../../assets/styles/colors";
import { OneCategory } from "../../../../Controllers/Pages/MainPage/MainCategory/OneCategory";

type stateCategory = {
    focused: boolean;
}
class OneCategoryView extends ViewItem {
    state: stateCategory = {
        focused: false
    }
    get controller():OneCategory{
        return this.props.controller
    }

    focusItem = () => {
        // console.error("FOCUS")
        this.setState({focused: true})
    }

    onBlur = () => {
        this.controller.onBlurItem()
        this.setState({focused: false})
    }

    render(){
        const { genre, focused, selected, onFocusItem, onBlurItem, setLayout, setTouchableRef } = this.controller
        return <View style={styles.container} onLayout={setLayout}>
                <Pressable
                    ref={setTouchableRef}
                    onPress={() => {}}
                    focusable={true}
                    isTVSelectable={true}
                    onFocus={onFocusItem}
                    onBlur={this.onBlur}
                    hasTVPreferredFocus={this.state.focused}
                    style={[styles.oneCategory, focused && styles.oneCategoryFocused, selected && styles.oneCategoryFocused]}
                    >
                <Text style="categoryItem" customStyle={[styles.textDefault, focused && styles.textSelected, , selected && styles.textSelected]}>{genre}</Text>
            </Pressable>
        </View>
    }
}

export { OneCategoryView }


const styles = StyleSheet.create({
    container: {
    },
    oneCategory: {
        // width: 48,
        // height: 48,
        paddingHorizontal: 10,
        // borderBottomWidth: 2,
        paddingBottom: 10,
        // borderColor: "",
        // borderRadius: 10,
        // borderColor: "rgba(0,0,0,0)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    oneCategoryFocused: {
        // borderBottomWidth: 2,
        // borderColor: '#0DB1FD',
    },
    textDefault: {
        color: "#636262"
    },
    textSelected: {
        color: FONTCOLOR
    }
});