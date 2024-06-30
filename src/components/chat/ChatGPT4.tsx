import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Button from '../ui/Button';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function ChatGPT4() {
  const {hasPermission} = useCameraPermission();
  const [photoInfo, setPhotoInfo] = useState<any>();

  const camera = useRef<Camera | null>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const handleTakePhoto = async () => {
    const photo = await camera.current!.takePhoto();
    setPhotoInfo(photo);
    if (photo) {
      const path = `${Platform.OS === 'android' ? 'file://' : ''}${photo.path}`;
      const savedResult = await CameraRoll.save(path, {
        type: 'photo',
        album: 'RnGPT',
      }).then(res => Alert.alert('Photo saved to camera roll'));

      console.log('savedResult>>>', savedResult);
    }
    console.log(photo);
  };
  const handleSavePhoto = async () => {
    if (Platform.OS === 'android' && !hasPermission) {
      return Camera.requestCameraPermission;
    }

    CameraRoll.saveToCameraRoll(photoInfo.uri, 'photo');
  };

  useEffect(() => {
    if (!hasPermission) {
      Camera.requestCameraPermission;
    }
  }, []);

  if (!hasPermission) {
    return <Text>No camera permission</Text>;
  }
  if (device == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        androidPreviewViewType="texture-view"
        photo={true}
      />
      <Button style={styles.button} onPress={handleTakePhoto}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'white',
            }}
          />
        </View>
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>ChatGPT4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    // bottom: 40,
    // width: 30,
    // height: 30,
    // borderWidth: 10,
  },
});
