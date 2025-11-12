import React from "react";
import { appNavigator } from "~/src/Controllers/Navigation";

type pressableState = {
    focused: boolean;
};

type pressableProps = {
    children: any;
    style?: React.CSSProperties;
    channel?: any;
    autoFocus?: boolean;
    focused?: boolean;
    onFocusAddition?: () => void;
    onBlurAddition?: () => void;
    onPress?: () => any;
    setFocusItem?: (ref: any) => void;
};

class PressableFocusView extends React.Component<pressableProps, pressableState> {
    private btnRef = React.createRef<HTMLButtonElement>();

    state: pressableState = {
        focused: this.props.focused || false,
    };

    componentDidMount(): void {
        if (this.props.autoFocus || this.props.focused) {
            this.btnRef.current?.focus();
        }
        this.props.setFocusItem?.(this.btnRef);
    }

    componentDidUpdate(prevProps: pressableProps): void {
        if (prevProps.focused !== this.props.focused && typeof this.props.focused === "boolean") {
            this.setState({ focused: this.props.focused });
            if (this.props.focused) this.btnRef.current?.focus();
        }
    }

    setFocused = (bool: boolean) => {
        this.setState({ focused: bool });
    };

    onFocus = () => {
        this.props.onFocusAddition?.();
        this.setFocused(true);
    };

    onBlur = () => {
        this.props.onBlurAddition?.();
        this.setFocused(false);
    };

    pressGoToChannel = () => {
        appNavigator().goToVideoPlayerPage(this.props.channel);
    };

    onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            (this.props.onPress || this.pressGoToChannel)();
        }
    };

    render() {
        const { focused } = this.state;
        const { children, style, onPress } = this.props;
        const pressAction = onPress || this.pressGoToChannel;

        const mergedStyle: React.CSSProperties = {
            ...styles.oneItem,
            ...(style || {}),
            ...(focused ? styles.oneItemSelected : {}),
        };

        return (
            <button
                ref={this.btnRef}
                type="button"
                onClick={pressAction}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                tabIndex={0}
                style={mergedStyle}
            >
                {children}
            </button>
        );
    }
}

export { PressableFocusView };

const styles: Record<string, React.CSSProperties> = {
    oneItem: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,0)",
        background: "transparent",
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: "none",
    },
    oneItemSelected: {
        borderColor: "#fff",
    },
};