import React from "react";
import { TextItem } from "../Components/TextItem";

type loaderProps = {
    color?: string;
};

class LoaderView extends React.Component<loaderProps> {
    render() {
        const { color } = this.props;
        const colorStyle = color !== undefined ? { color: color } : {};

        return (
            <div style={styles.container}>
                <TextItem customStyle={colorStyle}>Loading ...</TextItem>
            </div>
        );
    }
}

export { LoaderView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
};
