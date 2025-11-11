import { Image, StyleSheet, View } from "react-native";
import { ViewItem } from "../../Base/ViewItem";
import { Text } from "../Components/TextItem";
import { BState } from "../../Models/BPlayer/BPlayerState";
import { LoaderView } from "../Core/LoaderView";
import { PLAYERICONS } from "../../Constants/icons";


class BStateView extends ViewItem {
    get controller():BState{
        return this.props.controller
    }
    render() {
        const { isLoading, isPlaying } = this.controller
        return null
        if(isLoading){
            return <View style={styles.container}>
                <View style={styles.loading}>
                    <LoaderView/>
                </View>
            </View>
        }
        return <View style={styles.container}>
            {!isPlaying && <View style={styles.fullBox}>
                <View style={styles.pauseButton}>
                    <Image 
                        style={styles.pauseButtonIcon}
                        source={{uri: PLAYERICONS.play}}
                    />
                </View>
            </View>}
        </View>
    }
}

export { BStateView}

const styles = StyleSheet.create({
    container: {
        maxHeight: 300
    },
    loading: {

    },
    fullBox: {

    },
    pauseButton: {

    },
    pauseButtonIcon: {

    }
})