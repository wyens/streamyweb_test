import React from "react";
import { PressableFocusView } from "./PressableFocusView";
import { FONTS } from "~/src/assets/styles/fonts";

export const DISTANCE_BETWEEN_ITEMS = 3;

type iptvHeaderRowProps = {
    title?: string;
    type?: "channel" | "mainepg" | "secondaryepg";
    children?: any;
    isMainColor?: any;
    centered?: boolean;
    pressable?: boolean;
    noMargin?: boolean;
    channel?: any;
    autoFocus?: boolean;
    noPadding?: boolean;
    focused?: boolean;
    slotTakes?: number;
    onFocusAddition?: () => void;
    onBlurAddition?: () => void;
};

class IptvHeaderRowView extends React.Component<iptvHeaderRowProps> {
    render() {
        const {
            title,
            type,
            children,
            isMainColor,
            centered,
            pressable,
            noMargin,
            noPadding,
            channel,
            autoFocus,
            onFocusAddition,
            onBlurAddition,
            slotTakes,
            focused,
        } = this.props;

        const containerStyle: React.CSSProperties = {
            ...styles.container,
            ...(centered ? styles.centered : {}),
            ...(isMainColor ? styles.mainBackground : styles.secondaryBackground),
            ...(type ? stylesByType[type] : {}),
            ...(type && !children ? colorByType[`${type}_color`] : {}),
            ...(noMargin ? { marginLeft: 0 } : {}),
            ...(noPadding ? { padding: 0 } : styles.defaultPadding),
            ...(slotTakes ? slotTakesWidth(slotTakes) : {}),
        };

        const content = children ?? (
            <span style={styles.text}>{title}</span>
        );

        if (pressable) {
            return (
                <PressableFocusView
                    focused={focused}
                    onFocusAddition={onFocusAddition}
                    onBlurAddition={onBlurAddition}
                    autoFocus={autoFocus}
                    channel={channel}
                    style={containerStyle}
                >
                    {content}
                </PressableFocusView>
            );
        }

        return <div style={containerStyle}>{content}</div>;
    }
}

export { IptvHeaderRowView };


const styles: Record<string, React.CSSProperties> = {
    container: {
        borderRadius: 3,
        display: "flex",
        justifyContent: "center",
    },
    defaultPadding: {
        padding: 10,
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
    },
    mainBackground: { backgroundColor: "#2D333D" },
    secondaryBackground: { backgroundColor: "#242830" },
    text: {
        fontFamily: FONTS.semi,
        fontSize: 14,
    },
};

const stylesByType: Record<NonNullable<iptvHeaderRowProps["type"]>, React.CSSProperties> = {
    channel: {
        minWidth: "10vw",
        height:'100%'
    },
    mainepg: {
        marginLeft: DISTANCE_BETWEEN_ITEMS,
        minWidth: "35vw",
    },
    secondaryepg: {
        marginLeft: DISTANCE_BETWEEN_ITEMS,
        minWidth: "20vw",
    },
};

const colorByType: Record<"channel_color" | "mainepg_color" | "secondaryepg_color", React.CSSProperties> = {
    channel_color: { backgroundColor: "#196FFD" },
    mainepg_color: { backgroundColor: "#196FFD" },
    secondaryepg_color: { backgroundColor: "#3C424F" },
};

function slotTakesWidth(slotTakes: number): React.CSSProperties {
    const itemVW = 20; // 0.2 * screenWidth
    const gapsPx = DISTANCE_BETWEEN_ITEMS * (slotTakes - 1);
    return { width: `calc(${itemVW * slotTakes}vw + ${gapsPx}px)` };
}