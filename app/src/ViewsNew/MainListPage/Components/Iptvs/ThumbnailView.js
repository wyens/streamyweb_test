import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '../../../../Views/Components/TextItem';
import { LiveBadge } from '../../../../Views/ViewControlsVideo/LiveBadge';

const ChannelThumbnail = ({ channelToken, onLoaded, saveAbortSignal }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    generateThumbnail();
  }, [channelToken]);

  const generateThumbnail = async () => {
    try {
      setLoading(true);
      setError(false);

      const controller = new AbortController();
      saveAbortSignal(channelToken, controller)
      // Pass the signal to the fetch request
      const response = await fetch('https://menfecto.com/thumbnail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelToken: channelToken,
        }),
        signal: controller.signal  // Add this line
      });

      if (!response.ok) {
        saveAbortSignal(channelToken, null)
        onLoaded()
        throw new Error('Failed to generate thumbnail');
      }

      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = () => {
        saveAbortSignal(channelToken, null)
        setThumbnail(reader.result);
        setLoading(false);
        onLoaded()
      };
      
      reader.readAsDataURL(blob);

    } catch (err) {
      saveAbortSignal(channelToken, null)
      // console.error('Thumbnail error:', err);
      setError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  }

  if (error || !thumbnail) {
    return (
      <View style={styles.container}>
        <Text customStyle={styles.errorText}>No preview</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.absoluteLiveBadge}>
        <LiveBadge pdLeft={0}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 90,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 160,
    height: 90,
  },
  errorText: {
    color: '#999',
    fontSize: 12,
  },
  absoluteLiveBadge: {
    position: "absolute",
    left: 10,
    bottom: 2
  }
});

export { ChannelThumbnail };
