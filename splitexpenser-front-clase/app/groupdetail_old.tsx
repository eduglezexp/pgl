import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login, token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([
    {
      id: "e.id1",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
    {
      id: "e.id2",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
    {
      id: "e.id3",
      desc: "e.description",
      amount: "e.amount",
      paid_by: "e.paid_by",
    },
  ]);
  const router = useRouter();

  const handleDelete = (id: string) => {
    console.log("Borro " + id);
    Alert.alert("Voy a borrar");
    for (let i = 0; i < expenses.length; i++) {
      console.log(expenses[i]);
      if (expenses[i].id == id) {
        expenses.splice(i, 1);
        setExpenses([...expenses]);
      }
    }
  };

  const handleUpdate = (id: string) => {
    Alert.alert("Voy a actualizar");
    for (let i = 0; i < expenses.length; i++) {
      const element = expenses[i];
      if (element.id == id) {
        Alert.alert(`${element.amount} - ${element.desc}`);
      }
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    console.log(index)
    console.log(field)
    console.log(value)
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Mi grupo</Text>
      {expenses.map((e, index) => (
        <View key={e.id}>
          <TextInput 
            keyboardType="number-pad" 
            onChangeText={(text) => {handleChange(index, "amount", text)}}
          >
            {e.amount}
          </TextInput>
          <TextInput
            onChangeText={(text) => {handleChange(index, "desc", text)}}
          >
            {e.desc}
          </TextInput>
          <Button title="Actualizar" onPress={() => handleUpdate(e.id)} />
          <Button title="Borrar" onPress={() => handleDelete(e.id)} />
        </View>
      ))}

      <Button title="Volver a mis grupos" onPress={() => router.replace("/")} />
    </View>
  );
}
