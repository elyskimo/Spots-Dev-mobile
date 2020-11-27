import { StatusBar } from "expo-status-bar";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from "react-redux";
import Store from "@redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import MainNavigation from '@navigation/MainNavigation';
import * as firebase from "firebase";
import firebaseConfig from "@config/firebase";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
