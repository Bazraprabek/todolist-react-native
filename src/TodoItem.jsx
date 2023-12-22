import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const TodoItem = ({ text, onPressRemove, onUpdateItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const handleUpdate = () => {
    setIsEditing(false);
    onUpdateItem(updatedText);
  };

  return (
    <View style={styles.item}>
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={updatedText}
          onChangeText={(value) => setUpdatedText(value)}
          autoFocus={true}
        />
      ) : (
        <Text>{text}</Text>
      )}
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.iconButton} onPress={handleUpdate}>
            <Icon name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsEditing(true)}
          >
            <Icon name="edit" size={20} color="#4CAF50" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={onPressRemove}>
          <Text style={styles.buttonText}>
            <Icon name="delete" size={20} color="#FF5252" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 5,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
    borderRadius: 5,
  },
});

export default TodoItem;
