import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import sendToAnthropic from "../services/anthropic";
import * as FileSystem from "expo-file-system";
import { apiRequest } from "../services/http";

export default function Picture() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const isTest = true;

  const convertImageToBase64 = async (imageUri: string) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // console.log("Base64 String:", base64String);
      return base64String;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const processImage = async (imageData: string) => {
    try {
      const response = await sendToAnthropic(imageData);
      return response;
    } catch (error) {
      console.error("Error sending image to Anthropic:", error);
    }
  };

  const takePicture = async () => {
    console.log("Taking picture...");
    let photo: CameraCapturedPicture | undefined; // Update type

    if (isTest) {
      const imagePath =
        "/Users/matthew/Documents/Matt/code/sourcify/test/pictures/peterfrano01.jpg";
      const data = await convertImageToBase64(imagePath);
      if (data) {
        const response = await processImage(data);
        console.log(response);
        const content: any = response?.content[0];
        console.log(content);
        const output = content.text;
      }
    } else {
      console.log("isNotTest");
      photo = await ref.current?.takePictureAsync({ base64: true });
      const data = photo?.base64;

      if (data) {
        await processImage(data);
      }

      if (!data) {
        console.error(
          "Error: Failed to capture image or base64 data is missing."
        );
        alert("Failed to capture image.");
        return;
      }
    }
  };

  const getItem = async (itemData: string) => {
    try {
      const response = await apiRequest<{ AccessToken: string }>({
        path: "https://t7b79ywcmk.execute-api.us-east-1.amazonaws.com/dev/auth",
        method: "GET",
        body: {},
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1 }}
        />
        <Button onPress={() => setUri(null)} title="Take another picture" />
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <AntDesign name="picture" size={32} color="white" />
            ) : (
              <Feather name="video" size={32} color="white" />
            )}
          </Pressable>
          <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "black",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
