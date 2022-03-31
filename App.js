import React, {useRef} from 'react';
import {
  View,
  UIManager,
  Pressable,
  Platform,
  findNodeHandle,
} from 'react-native';
import {CameraView} from './CameraView';

export default function App() {
  const componentRef = useRef(null);

  const dispatchCaptureCommand = () => {
    Platform.OS === 'android'
      ? UIManager?.dispatchViewManagerCommand(
          findNodeHandle(componentRef?.current),
          UIManager?.RNCSTMCamera?.Commands?.captureImage?.toString(),
          [findNodeHandle(componentRef?.current)],
        )
      : UIManager.dispatchViewManagerCommand(
          findNodeHandle(componentRef?.current),
          UIManager.getViewManagerConfig('RNCSTMCamera').Commands.captureImage,
          [],
        );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <CameraView ref={componentRef} style={{flex: 1}} />
      <View
        style={{
          backgroundColor: '#0006',
          position: 'absolute',
          bottom: 60,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          width: 100,
          borderRadius: 60,
        }}>
        <Pressable
          style={{
            height: 75,
            width: 75,
            borderRadius: 37.5,
            backgroundColor: '#fff',
          }}
          onPress={dispatchCaptureCommand}
        />
      </View>
    </View>
  );
}
