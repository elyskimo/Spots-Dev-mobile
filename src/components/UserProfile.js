import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Alert, Button} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectUser, disconnectUser } from "@redux/user/actions";

const UserProfile = (props) => {
    const { connectUser, disconnectUser, user } = props;

    const logOut = () => {
        disconnectUser();
    };

    return (
        <View style={styles.container}>
            <Text>User Profile component</Text>
            <Text>Username</Text>
            <Text>Email</Text>
            <View style={styles.button}>
                <Button onPress={logOut}
                        title={"Log out"}
                />
            </View>
        </View>
    );
};

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

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            connectUser,
            disconnectUser,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);