import React from "react";

type LiveBadgeProps = {
    pdLeft?: number;
};

class LiveBadge extends React.Component<LiveBadgeProps> {
    render() {
        const { pdLeft } = this.props;
        const paddingStyles: React.CSSProperties = pdLeft !== undefined ? { paddingLeft: pdLeft } : {};

        return (
            <div style={{ ...styles.liveBadge, ...paddingStyles }}>
                {/*<img src={liveImg} alt="LIVE" style={styles.logoLive} />*/}
            </div>
        );
    }
}

export { LiveBadge };

const styles: Record<string, React.CSSProperties> = {
    liveBadge: {
        paddingLeft: 15,
        display: "flex",
        alignItems: "center",
    },
    logoLive: {
        width: 51,
        height: 21,
        objectFit: "contain",
        display: "block",
    },
};