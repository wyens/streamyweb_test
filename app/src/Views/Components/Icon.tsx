import React from "react";

type iconProps = {
    source: string;
    style?: "button" | "input" | "leftInput" | "selectorItem";
    onPress?: () => void;
    customStyle?: React.CSSProperties;
    customImgStyle?: React.CSSProperties;
    opacity?: number;
};

class Icon extends React.Component {
    props: iconProps;
    constructor(props: iconProps) {
        super(props);
        this.props = props;
    }

    render() {
        const { style, source, onPress, customStyle, opacity, customImgStyle } = this.props;
        const findStyle = style ? styles[style] : {};
        const findBoxStyle = style ? styles[`${style}Box`] : {};

        return (
            <div style={{ ...styles.iconBox, ...findBoxStyle, ...customStyle }}>
                <button
                    onClick={onPress}
                    style={{ ...styles.touchable, opacity: opacity ?? 1 }}
                >
                    <img
                        src={source}
                        alt=""
                        style={{ ...styles.icon, ...findStyle, ...customImgStyle }}
                    />
                </button>
            </div>
        );
    }
}

export { Icon };

const styles: Record<string, React.CSSProperties> = {
    iconBox: {
        position: "absolute",
        bottom: 0,
        top: 0,
        width: "15%",
        minWidth: 20,
    },
    touchable: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
    },
    icon: {
        maxWidth: "100%",
        maxHeight: "100%",
        display: "block",
    },
    button: {
        width: 30,
        height: 30,
    },
    buttonBox: {
        left: 0,
    },
    input: {
        width: 25,
        height: 25,
    },
    inputBox: {
        right: 0,
        maxWidth: 30,
    },
    selectorItem: {},
    selectorItemBox: {},
    leftInput: {
        width: 17,
        height: 17,
    },
    leftInputBox: {
        left: 3,
        maxWidth: 25,
    },
};