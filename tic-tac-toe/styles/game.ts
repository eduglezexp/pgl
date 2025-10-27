import { StyleSheet } from "react-native";

export const game = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    board: {
        borderWidth: 1,
    },

    history: {
        marginTop: 30,
        borderWidth: 1,
        width: "77%",
        maxHeight: 200,
    },
})