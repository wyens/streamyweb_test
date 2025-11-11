import React from "react";
import { Image, StyleSheet, View } from "react-native";

type LiveBadgeProps = {
    pdLeft?:number;
}
class LiveBadge extends React.Component<LiveBadgeProps> {

    render(){
        const { pdLeft } = this.props
        const paddingStyles = pdLeft!=undefined ? {paddingLeft: pdLeft} : {}
        return <View style={[styles.liveBadge, paddingStyles]}>
                <Image source={require('../../assets/img/design/live.png')} style={styles.logoLive} />
            </View>
    }
}

export { LiveBadge }

const styles = StyleSheet.create({
    liveBadge: {
        paddingLeft: 15,
    },
    logoLive: {
        width: 51,
        height: 21,
        resizeMode: 'contain',
    },
})