import React from "react";
import { FONTS } from "~/src/assets/styles/fonts";
import {TextItem} from "~/src/Views/Components/TextItem";

type notInitedProps = {
    message: string;
    style?: string;
}

class NotInitedComponent extends React.Component {
    props: notInitedProps
    constructor(props:notInitedProps){
        super(props)
        this.props = props
    }
    render() {
        const { message } = this.props;
        return (
            <div style={styles.container}>
                <TextItem customStyle={styles.textMessage}>{message}</TextItem>
            </div>
        );
    }
}

export { NotInitedComponent };

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 80,
    },
    textMessage: {
        fontSize: 18,
        fontFamily: FONTS.black,
    },
};