import React from "react";
import { Button } from "../Components/ButtonItem";
import { XB } from "../../assets/styles/paddings";
import {TextItem} from "~/src/Views/Components/TextItem";

type emptyMessageProps = {
    message?: string;
    submessage?: string;
    button?: any;
    style?: "list";
};

class EmptyMessageView extends React.Component {
    props: emptyMessageProps;
    constructor(props: emptyMessageProps) {
        super(props);
        this.props = props;
    }

    render() {
        const { message, submessage, button, style } = this.props;
        const styleBox = style ? styles[style] : {};

        return (
            <div style={{ ...styles.container, ...styleBox }}>
                {message && <TextItem style="pageHead">{message}</TextItem>}
                {submessage && <TextItem center>{submessage}</TextItem>}
                {button && <Button {...button} />}
            </div>
        );
    }
}

export { EmptyMessageView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        paddingTop: XB,
        paddingBottom: XB,
    },
    list: {
        backgroundColor: "transparent",
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};