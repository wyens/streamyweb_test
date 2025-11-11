import { ReactNode } from "react";
import { ViewItem } from "../../Base/ViewItem";
import { StyleSheet, View } from "react-native";
import { FilmButton } from "../Page/MainStack/OneFilm/FilmButton";
import { DESIGNICONS } from "../../Constants/icons";
import { FavoriteButton } from "../../Models/FavoriteButton";


class FavoriteButtonView extends ViewItem {

    get controller():FavoriteButton {
        return this.props.controller
    }
    render() {
        const { onClick, selected } = this.controller
        return <View style={styles.container}>
            <FilmButton 
                onPress={onClick}
                title="Save"
                ico={selected ? DESIGNICONS.favoritesSelW : DESIGNICONS.favorites}
                customIcoStyle={{width: 18, height:18}}
            />
        </View>
    }
}

export { FavoriteButtonView }

const styles = StyleSheet.create({
    container: {

    }
})