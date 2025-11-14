import React from "react";
import { BASE_ICONS } from "~/src/Constants/icons";
import { TextItem } from "~/src/Views/Components/TextItem";

type Props = {
    opacity?: number;
    onBack?: () => void;
    title?: string;
    autoFocus?: boolean;
};

export const VideoChannels: React.FC<Props> = ({ opacity, onBack, title, autoFocus }) => {
    const [focused, setFocused] = React.useState(false);

    return (
        <div
            style={{
                ...styles.container,
                ...(focused ? styles.backButtonFocused : {}),
                ...(opacity !== undefined ? { opacity } : {}),
            }}
        >
            <button
                type="button"
                onClick={onBack}
                autoFocus={!!autoFocus}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
                style={styles.wrap}
            >
                <div>
                    <img src={BASE_ICONS.burger} style={styles.burgerIcon} alt="" />
                </div>

                {!!title && (
                    <TextItem stylesText={styles.title}>
                        {title}
                    </TextItem>
                )}
            </button>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: 155,
        paddingLeft: 15,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    wrap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 0,
        paddingRight: 15,
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        background: "transparent",
        cursor: "pointer",
        outline: "none",
    },
    backButtonFocused: {
        borderColor: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    burgerIcon: {
        width: 30,
        height: 30,
        objectFit: "contain",
        filter: "brightness(0) invert(1)",
    },
    title: {
        marginLeft: 15,
        color: "#ffffff",
        fontSize: 14,
    },
};