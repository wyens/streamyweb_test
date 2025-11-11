import React from "react";
import {appNavigator} from "~/src/Controllers/Navigation";

type pressableState = {
    focused: boolean;
}

type pressableProps = {
    children: any;
    style?: any;
    channel?:any;
    autoFocus?: boolean;
    focused?: boolean;
    onFocusAddition?:any;
    onBlurAddition?:any;
    onPress?: ()=>any
    setFocusItem?: (ref:any)=>void
}

class PressableFocusView extends React.Component<pressableProps> {

    state: pressableState = {
        focused: this.props.focused || false
    }

    setFocused = (bool: boolean) => {
        this.setState({focused: bool})
    }

    onFocus = () => {
        if(this.props.onFocusAddition){
            this.props.onFocusAddition()
        }
        this.setFocused(true)
    }

    onBlur = () => {
        if(this.props.onBlurAddition){
            this.props.onBlurAddition()
        }
        this.setFocused(false)
    }

    pressGoToChannel = () =>{ 
        appNavigator().goToVideoPlayerPage(this.props.channel)
    }
    render(){
        const { focused } = this.state
        const { children, style, onPress, setFocusItem } = this.props
        const pressAction = onPress || this.pressGoToChannel
        return null;
        // return <Pressable
        //             ref={setFocusItem}
        //             onPress={pressAction}
        //             focusable={true}
        //             // @ts-ignore
        //             isTVSelectable={true}
        //             hasTVPreferredFocus={focused || this.props.focused}
        //             onFocus={this.onFocus}
        //             onBlur={this.onBlur}
        //             style={[style, styles.oneItem, focused && styles.oneItemSelected]}
        //             // @ts-ignore
        //             // autoFocus={false}
        //             >
        //         {children}
        //     </Pressable>
    }
}

export { PressableFocusView }

// const styles = StyleSheet.create({
//     oneItem: {
//         borderWidth: 2,
//         borderColor: 'rgba(0,0,0,0)',
//     },
//     oneItemSelected: {
//         borderWidth: 2,
//         borderColor: '#fff',
//     },
// })
