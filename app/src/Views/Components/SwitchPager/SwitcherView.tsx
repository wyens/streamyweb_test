import React from 'react'
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { ViewItem } from '../../../Base/ViewItem';
import { Switcher } from '../../../Models/Switcher/Switcher';
import { SwitchItemView } from './SwitchItemView';
import { WB, WM, XB } from '../../../assets/styles/paddings';
import { COLORS, MAIN_THEME_COLOR } from '../../../assets/styles/colors';
import { hometabs } from '../../../Controllers/Pages/HomeStack/IptvPage/IptvPageModel';


type rideSwitchState = {
    left: Animated.Value,
    currentSelected: hometabs;
}

const animationDuration = 200
const easing = Easing.linear

class SwitcherView extends ViewItem {
    state:rideSwitchState
    animatingNow: boolean = false;
    constructor(props: any){
        super(props)
        this.state = {
            left: new Animated.Value(styles.defaultPosition.left),
            currentSelected: "list",
        }
    }
    get controller(): Switcher {
        return this.props.controller
    }
    
    appendPosition = () => {
        if(this.animatingNow){
            return
        }
        this.animatingNow = true
        Animated.timing(this.state.left, {
            toValue: styles.appendPosition.left,
            useNativeDriver: false,
            duration: animationDuration,
            easing: easing,
        }).start(()=>{
            this.animatingNow = false
        })
    }
    defaultPosition = () => {
        if(this.animatingNow){
            return
        }
        this.animatingNow = true
        Animated.timing(this.state.left, {
            toValue: styles.defaultPosition.left,
            useNativeDriver: false,
            duration: animationDuration,
            easing: easing,
        }).start(()=>{
            this.animatingNow = false
        })
    }

    animateToType = (type: hometabs) => {
        if(type===this.state.currentSelected){
            return
        }
        this.setState({currentSelected: type})
        if(type === "epg"){
            this.appendPosition()
        } else {
            this.defaultPosition()
        }
    }
    render(){
        const { onPressSwitchItem } = this.controller
        const left = this.state.left.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '50%'],
            extrapolate: 'clamp',
        });
        return <View style={styles.container}>
            <View style={styles.box}>
                <Animated.View style={[styles.switch, {left}]}></Animated.View>
                <View style={styles.items}>
                    <SwitchItemView title='Channels' type='list' onPress={onPressSwitchItem}/>
                    <SwitchItemView title='Epg' type='epg' onPress={onPressSwitchItem}/>
                </View>
            </View>
        </View>
    }
}

export { SwitcherView }

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: WB,
        alignItems: "center"
    },
    box: {
        backgroundColor: COLORS.MENUCOLOR,
        width: '90%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    switch: {
        position: "absolute",
        backgroundColor: MAIN_THEME_COLOR,
        height: '100%',
        width: '50%',
        borderRadius: 10,
        // shadowColor: "#fff",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,
        // elevation: 6,
    },
    defaultPosition: {
        left: 0
    },
    appendPosition: {
        // left: Dimensions.get('screen').width
        left: 100
    },
    items: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})