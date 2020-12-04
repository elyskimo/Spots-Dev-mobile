import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectUser, disconnectUser } from "@redux/user/actions";
import {Icon, Button, Content} from "native-base";

const UserProfile = (props) => {
    const { connectUser, disconnectUser, user } = props;

    const logOut = () => {
        disconnectUser();
    };

    return (
        <View style={styles.container}>
            <Content style={{marginTop: 100,marginBottom:0,paddingBottom:0}}>
                <Icon type="MaterialCommunityIcons" name="account-circle" style={{fontSize: 100}}></Icon>
            </Content>
            <View style={{width:'100%',alignItems: 'center'}}>
                <Text style={{fontSize: 18,fontWeight:'bold'}}>{user.username}</Text>
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <Content style={{minWidth:'50%'}}>
                <Button block dark style={styles.button} onPress={logOut}>
                    <Text style={{color:'#fff'}}>Log out</Text>
                </Button>
            </Content>
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
        marginTop: 50,
    },
    text: {
        fontSize: 18,
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