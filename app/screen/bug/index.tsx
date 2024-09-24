import Back from "@/assets/icons/backIcon";
import { Button, Input } from "@/components/common";
import * as ImagePicker from "expo-image-picker";
import { font } from "@/utils";
import useThemeStore from "@/utils/stores/usethemeProp";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BugImgUpload } from "@/assets/icons";

export const Bug = () => {
  const { theme } = useThemeStore();
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (result.canceled) {
      return null;
    }

    const uris = result.assets?.map((asset) => asset.uri);
    if (uris) {
      setImageUrls([...imageUrls, ...uris]);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.BG,
        paddingTop: 40,
        height: "100%",
        paddingHorizontal: 24,
      }}
    >
      <View style={styles.header}>
        <Pressable style={styles.Icon} onPress={() => navigation.goBack()}>
          <Back Fill={theme.normal.black} />
        </Pressable>
        <Text style={[font.body[1], { color: theme.normal.black }]}>
          버그제보
        </Text>
        <View style={styles.Icon} />
      </View>

      <View style={{ marginTop: 24, gap: 40 }}>
        <Input
          onChange={() => {}}
          label="어디서 버그가 발생했나요? "
          placeholder="예: 메인, 외출 신청"
        />
        <Input
          label="버그에 대해 설명해주세요."
          multiLine={8}
          onChange={() => {}}
          placeholder="자세히 입력해주세요"
        />
        <Pressable
          onPress={uploadImage}
          style={[
            styles.uploadButton,
            {
              borderColor: theme.Gray[700],
              backgroundColor: theme.Gray[50],
            },
          ]}
        >
          <BugImgUpload Fill={theme.Gray[500]} />
          <Text style={{ color: theme.Gray[700] }}>이미지 업로드</Text>
        </Pressable>
        <ScrollView horizontal style={styles.imageContainer}>
          {imageUrls.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 160 }}>
        <Button size="main" onPress={() => {}}>
          버그 제보
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  Icon: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  uploadButton: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 4,
  },
});
