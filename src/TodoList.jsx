import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, Button, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getTodoItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("todoItems");
        if (storedItems !== null) {
          setTodoItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };

    getTodoItems();
  }, []);

  const handleAddItem = async () => {
    if (text) {
      const updatedItems = [...todoItems, text];
      setTodoItems(updatedItems);
      setText("");

      try {
        await AsyncStorage.setItem("todoItems", JSON.stringify(updatedItems));
      } catch (error) {
        console.error("Error saving data: ", error);
      }
    }
  };

  const removeTodoItem = async (indexToRemove) => {
    const updatedItems = todoItems.filter(
      (_, index) => index !== indexToRemove
    );
    setTodoItems(updatedItems);

    try {
      await AsyncStorage.setItem("todoItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const updateTodoItem = async (indexToUpdate, newText) => {
    const updatedItems = todoItems.map((item, index) =>
      index === indexToUpdate ? newText : item
    );
    setTodoItems(updatedItems);

    try {
      await AsyncStorage.setItem("todoItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const clearTodoItems = async () => {
    try {
      await AsyncStorage.removeItem("todoItems");
      setTodoItems([]);
    } catch (error) {
      console.error("Error clearing data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo..."
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <Button title="Add" onPress={handleAddItem} />
      <FlatList
        style={{ marginTop: 5 }}
        data={todoItems}
        renderItem={({ item, index }) => (
          <TodoItem
            text={item}
            onPressRemove={() => removeTodoItem(index)}
            onUpdateItem={(newText) => updateTodoItem(index, newText)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Clear All" onPress={clearTodoItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default TodoList;
