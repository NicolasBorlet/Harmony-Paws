import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { supabase } from '@/lib/supabase';

interface VideoProductProps {
  productId: string;
  userId: string;
}

interface PurchaseStatus {
  hasPurchased: boolean;
  videoUrl: string | null;
}

export default function VideoProduct({ productId, userId }: VideoProductProps) {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const player = useVideoPlayer(videoUrl || '', player => {
    if (videoUrl) {
      player.loop = true;
    }
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEffect(() => {
    checkPurchaseStatus();
  }, [productId, userId]);

  const checkPurchaseStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke<PurchaseStatus>(
        'check-purchase-status',
        {
          body: JSON.stringify({
            productId,
            userId,
          }),
        }
      );

      if (error) {
        console.error('Error checking purchase status:', error);
        return;
      }

      setHasPurchased(data?.hasPurchased || false);
      setVideoUrl(data?.videoUrl || null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!hasPurchased || !videoUrl) {
    return (
      <View style={styles.container}>
        <Text>Purchase this course to watch the video</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoView 
        style={styles.video} 
        player={player} 
        allowsFullscreen 
        allowsPictureInPicture 
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
