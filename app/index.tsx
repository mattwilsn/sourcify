// app/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "../services/http";
import { storeToken } from "../services/token";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await apiRequest<{ AccessToken: string }>({
        path: "https://t7b79ywcmk.execute-api.us-east-1.amazonaws.com/dev/auth",
        method: "POST",
        body: { username: email, password: password },
        headers: { "Content-Type": "application/json" },
      });

      if (response.AccessToken) {
        storeToken(response.AccessToken);
        router.push("/main");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    // // Simulate authentication logic (replace with your actual backend)
    // if (email === "test@example.com" && password === "password") {
    //   // Successful login
    //   Alert.alert("Success", "Login successful!");
    //   router.push("/main"); // Navigate to the home tab
    // } else {
    //   // Failed login
    //   Alert.alert("Error", "Invalid credentials");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/register" style={styles.registerLink}>
        <Text>Register</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerLink: {
    marginTop: 10,
    alignSelf: "center",
  },
});

export default Login;
