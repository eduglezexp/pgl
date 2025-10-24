import { View } from "react-native"; 
import { styles } from "@/styles/styles";
import Square from "@/components/Square";

export default function Board() {
  return (
    <View>
      <View style={styles.row}>
        <Square value={"x"}></Square>
        <Square value={"x"}></Square>
        <Square value={"x"}></Square>
      </View>
      <View style={styles.row}>
        <Square value={"x"}></Square>
        <Square value={"x"}></Square>
        <Square value={"x"}></Square>
      </View>
      <View style={styles.row}>
        <Square value={"x"}></Square>
        <Square value={"x"}></Square>
        <Square value={"x"}></Square>
      </View>
    </View>
  );
}
