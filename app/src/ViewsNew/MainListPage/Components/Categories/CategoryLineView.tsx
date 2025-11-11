import { Animated, StyleSheet, View } from "react-native";
import { ViewItem } from "../../../../Base/ViewItem";
import LinearGradient from 'react-native-linear-gradient';
import { CategoryLine, PADDING_ON_CATEGORY_LIST } from "../../../../Controllers/Pages/MainPage/MainCategory/CategoryLine";
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

class CategoryLineView extends ViewItem {

    get controller():CategoryLine {
        return this.props.controller
    }
    render(){
    const { layout, isVisible, left, width, sectionEnabled } = this.controller;
    const sectionStyle = sectionEnabled ? styles.sectionEnabled : {}
    // console.error("SECTION ENABLED", sectionEnabled)
    return (
        <View style={[styles.container, sectionStyle]}>
            <AnimatedLinearGradient 
                colors={['#04E5FD', '#1A69FD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.line,
                    {
                    transform: [{ translateX: left }],
                    width: width,
                    opacity: isVisible ? 1 : 0 // Use opacity instead
                    }
                ]} 
            />
        </View>
    );
    }
}

export { CategoryLineView }

const styles = StyleSheet.create({
    container: {
        paddingLeft: PADDING_ON_CATEGORY_LIST,
        height: 1,
        backgroundColor: "#2C2F42",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        // backgroundColor: "red",
    },
    sectionEnabled: {
        backgroundColor: "#2a326cff"
    },
    line: {
        // backgroundColor: "red",
        // minWidth: 100,
        height: 2
    }
})