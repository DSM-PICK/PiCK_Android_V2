import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  //const refreshToken = await AsyncStorage.getItem("refreshToken");
  const account = await AsyncStorage.getItem("account").then((i) =>
    i?.split("||")
  );
  const name = await AsyncStorage.getItem("name");
  return { accessToken, account, name };
};

export const removeToken = async () => {
  //await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("account");
  await AsyncStorage.removeItem("name");
  return;
};

export const setToken = async (
  accessToken: string,
  account: string[],
  name: string
  // refreshToken: string
) => {
  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("account", account.join("||"));
  await AsyncStorage.setItem("name", name);
  // await AsyncStorage.setItem("refreshToken", refreshToken);
  return;
};

export const setUserId = async (userId: string) => {
  await AsyncStorage.setItem("userId", userId);
};

export const getUserId = () => {
  const id = AsyncStorage.getItem("userId");
  return id;
};
