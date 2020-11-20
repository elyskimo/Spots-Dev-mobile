import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import {connect} from "react-redux";
// import { connectUser, disconnectUser } from "@redux/user/actions";
// import { bindActionCreators } from "redux";

const AddSpot = () => {
    // const { connectUser, disconnectUser, user } = props;

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Text>Add spot screen</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 200,
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: '#00aad2',
        borderRadius: 10,
    }
});

export default AddSpot;
