import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MyComponent from './src/MyComponent'

function App() {

  return (
    <SafeAreaView style={styles.bodyStyle}>
      <MyComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyStyle: {
    flex: 1,
    backgroundColor: "#000",
  }
});

export default App;
