import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import TodoList from "./src/TodoList";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        TO DO LIST
      </Text>
      <TodoList />
    </SafeAreaView>
  );
};

export default App;
