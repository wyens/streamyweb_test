import React from "react";
import { TEXTCOLORS } from "~/src/assets/styles/colors";
import { WB, WS } from "~/src/assets/styles/paddings";
import {TextItem} from "~/src/Views/Components/TextItem";

type listTitleProps = {
    title?: string;
}

class ListTitleView extends React.Component {
    props: listTitleProps;
    constructor(props: listTitleProps) {
        super(props);
        this.props = props;
    }

    render() {
        const { title } = this.props;
        if (!title) {
            return null;
        }
        return (
            <div style={styles.container}>
                <TextItem style="listTitle">{title}</TextItem>
            </div>
        );
    }
}

export { ListTitleView };

const styles = {
    container: {
        borderBottom: `1px solid ${TEXTCOLORS.secondary}`,
        paddingLeft: WB,
        paddingRight: WB,
        paddingBottom: WS,
    },
};