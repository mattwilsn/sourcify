import * as SecureStore from "expo-secure-store";

export async function storeToken(token: any) {
  try {
    await SecureStore.setItemAsync("authToken", token);
    console.log("Token stored successfully!");
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
