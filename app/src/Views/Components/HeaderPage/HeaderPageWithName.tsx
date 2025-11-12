import React from "react";
import type { ControllerLogout } from "~/src/Models/ControllerControlsVideo/ControllerLogout";
import { ViewItem, type viewItemProps } from "~/src/Base/ViewItem";
import { BASE_ICONS } from "~/src/Constants/icons";
import { BORDERCOLOR } from "~/src/assets/styles/colors";
import { UserShortNameView } from "~/src/Views/Design/UserShortNameView";
import { TextItem } from "~/src/Views/Components/TextItem";
import { HEADER_HEIGHT } from "~/src/Views/Components/HeaderPage/HeaderPage";

export type HeaderPageProps = viewItemProps & {};

export class HeaderPageWithName extends ViewItem {
    props: HeaderPageProps;

    state = {
        focused: false,
        hovered: false,
    };

    constructor(props: HeaderPageProps) {
        super(props);
        this.props = props;
    }

    get controller(): ControllerLogout {
        return this.props.controller;
    }

    public onLogout = async () => {
        this.controller.showControllers();
    };

    public get controllerLogout() {
        return this.controller;
    }

    public setFocused = (value: boolean) => {
        this.setState({ focused: value });
    };

    public setHovered = (value: boolean) => {
        this.setState({ hovered: value });
    };

    render() {
        const { focused, hovered } = this.state;

        return (
            <>
                <div style={styles.container}>
                    <div style={styles.gradientFill} />
                    <img
                        src={BASE_ICONS.sttechlogo}
                        alt="sttech"
                        style={styles.sttechlogo}
                    />

                    <button
                        type="button"
                        onClick={this.onLogout}
                        onFocus={() => this.setFocused(true)}
                        onBlur={() => this.setFocused(false)}
                        onMouseEnter={() => this.setHovered(true)}
                        onMouseLeave={() => this.setHovered(false)}
                        tabIndex={0}
                        style={{
                            ...styles.userName,
                            ...(focused || hovered ? styles.userNameActive : {}),
                        }}
                    >
                        <TextItem customStyle={styles.shortName}>
                            <UserShortNameView />
                        </TextItem>
                    </button>
                </div>
            </>
        );
    }
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px",
        height: HEADER_HEIGHT,
    },

    gradientFill: {
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(180deg, #1C1E2C 0%, #17181E 100%)",
        pointerEvents: "none",
        zIndex: 0,
    },

    sttechlogo: {
        width: 83,
        height: 28,
        objectFit: "contain",
        zIndex: 1,
        paddingLeft: 10
    },

    userName: {
        width: 35,
        height: 35,
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: BORDERCOLOR,
        borderRadius: 18,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        cursor: "pointer",
        outline: "none",
        zIndex: 1,
        transition: "transform 150ms ease, border-color 150ms ease",
    },

    userNameActive: {
        borderColor: "#00C2FF",
        transform: "scale(1.1)",
    },

    shortName: {
        fontSize: 14,
        lineHeight: "10px",
    },
};