import { ViewItem } from "../../Base/ViewItem";
import { StyleSheet, View } from "react-native";
import { menuHeight } from "../../assets/styles/paddings";
import { COLORS } from "../../assets/styles/colors";
import { MenuButtonView } from "../Design/MenuButtonView";
import { MenuController } from "../../Controllers/MenuController";

// export const StatusHeight = 0;
export const StatusHeight = initialWindowMetrics?.insets?.bottom || 0;

class MainMenuView extends ViewItem {

    get controller():MenuController{
        return this.props.controller
    }

    render() {
        const { buttons, visible } = this.controller
        if(!visible){
          return null
        }
        return <View style={[styles.container, ]}>
        <View style={[styles.absoluteContainer]}>{buttons && buttons.map((b) => <MenuButtonView key={b.id} ref={b.set} controller={b} />)}</View>
      </View>
    }
}

export { MainMenuView }

const styles = StyleSheet.create({
    container: {
      // height: menuHeight,
      // backgroundColor: "red"
    },
    absoluteContainer: {
      height: menuHeight + StatusHeight,
      paddingBottom: StatusHeight,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      backgroundColor: COLORS.MENUCOLOR,
      // borderTopLeftRadius: 10,
      // borderTopRightRadius: 10,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
  });
  