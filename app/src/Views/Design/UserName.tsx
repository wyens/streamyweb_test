import React from 'react'
import { Image, StyleSheet, View } from "react-native";
import { UpdateComponent } from "../../Base/UpdateComponent";
import { BASE_ICONS } from '../../Constants/icons';
import { controllers } from '../../Controllers/Controllers';
import { UPDATE } from "../../Helpers/constants";
import { Text } from '../Components/TextItem';

type userphotoprops = { 
    style?: "main"|"h2"
}

class UserNameView extends UpdateComponent {
    props: userphotoprops
    constructor(props: userphotoprops){
        super(props)
        this.props = props
        this.type = UPDATE.USERINFO
    }

    render(){

        const {style} = this.props
        // const source = controllers().auth.userInfo?.name
        const source = "controllers().auth.userInfo?.name"
        const lastname = controllers().auth.userInfo?.lastname
        return <Text style={style}>{source + " " + lastname}</Text>
        // return <Text style={style}>Eminem Ivanovich</Text>
    }
}

export { UserNameView }