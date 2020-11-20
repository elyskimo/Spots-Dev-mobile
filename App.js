import { StatusBar } from "expo-status-bar";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from "react-redux";
import Store from "@redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import MainNavigation from '@navigation/MainNavigation';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDkf32oqkBSdpI9QWDfhW75v7N2PWDKNUQ",
  authDomain: "spots-81c62.firebaseapp.com",
  databaseURL: "https://spots-81c62.firebaseio.com",
  projectId: "spots-81c62",
  storageBucket: "spots-81c62.appspot.com",
  messagingSenderId: "400822979337",
  appId: "1:400822979337:web:ff4fb21f37138738ed21d8",
  measurementId: "G-TEHSR78M2M"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  let persistor = persistStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: '100%',
    backgroundColor: '#ecf0f1',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
