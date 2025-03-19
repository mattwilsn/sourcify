import * as SecureStore from "expo-secure-store";

export async function storeToken(token: any, tokenName: string) {
  try {
    await SecureStore.setItemAsync(tokenName, token);
    console.log("Token stored successfully!");
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

export async function getToken(tokenName: string) {
  try {
    const token = await SecureStore.getItemAsync(tokenName);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
