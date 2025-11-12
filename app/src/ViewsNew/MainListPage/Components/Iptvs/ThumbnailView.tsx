import React, { useState, useEffect, useRef } from "react";
import {TextItem} from "~/src/Views/Components/TextItem";
import {LiveBadge} from "~/src/Views/ViewControlsVideo/LiveBadge";

type Props = {
    channelToken: string;
    onLoaded: () => void;
    saveAbortSignal: (token: string, controller: AbortController | null) => void;
};

const ChannelThumbnail: React.FC<Props> = ({ channelToken, onLoaded, saveAbortSignal }) => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const generateThumbnail = async () => {
            try {
                setLoading(true);
                setError(false);

                // abort попереднього запиту, якщо був
                abortRef.current?.abort();

                const controller = new AbortController();
                abortRef.current = controller;
                saveAbortSignal(channelToken, controller);

                const response = await fetch("https://menfecto.com/thumbnail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ channelToken }),
                    signal: controller.signal,
                });

                if (!response.ok) {
                    saveAbortSignal(channelToken, null);
                    onLoaded();
                    throw new Error("Failed to generate thumbnail");
                }

                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = () => {
                    saveAbortSignal(channelToken, null);
                    setThumbnail(reader.result as string);
                    setLoading(false);
                    onLoaded();
                };

                reader.readAsDataURL(blob);
            } catch (err: any) {
                if (err?.name === "AbortError") return; // якщо просто скасовано — ігнор
                saveAbortSignal(channelToken, null);
                setError(true);
                setLoading(false);
            }
        };

        generateThumbnail();

        return () => {
            abortRef.current?.abort();
            saveAbortSignal(channelToken, null);
        };
    }, [channelToken, onLoaded, saveAbortSignal]);

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loader} />
            </div>
        );
    }

    if (error || !thumbnail) {
        return (
            <div style={styles.container}>
                <TextItem customStyle={styles.errorText}>No preview</TextItem>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <img src={thumbnail} alt="thumbnail" style={styles.thumbnail} />
            <div style={styles.absoluteLiveBadge}>
                <LiveBadge pdLeft={0} />
            </div>
        </div>
    );
};

export { ChannelThumbnail };

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: 160,
        height: 90,
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    thumbnail: {
        width: 160,
        height: 90,
        objectFit: "cover",
        display: "block",
    },
    errorText: {
        color: "#999",
        fontSize: 12,
    },
    absoluteLiveBadge: {
        position: "absolute",
        left: 10,
        bottom: 2,
    },
    loader: {
        width: 20,
        height: 20,
        border: "2px solid #999",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
};
//
// if (!document.getElementById("spinner-style")) {
//     const style = document.createElement("style");
//     style.id = "spinner-style";
//     style.innerHTML = `
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }`;
//     document.head.appendChild(style);
// }