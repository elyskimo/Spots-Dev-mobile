import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { Container, Label, Button, Form, Item, Input } from 'native-base';
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectUser, disconnectUser } from "@redux/user/actions";

const Login = (props) => {

    const { connectUser, disconnectUser, user } = props;

    const [email,setEmail] = useState(false);
    const [password,setPassword] = useState(false);
    const [password2,setPassword2] = useState(false);
    const [username,setUsername] = useState(false);
    const [showSingUp,setShowSignUp] = useState(false);

    const signUpUser = () => {
        console.log('sign up', email, password);
        if (password.length < 6) {
            alert("Password must have at least 6 characters");
            return;
        }
        if (email.length === 0) {
            alert("Enter valid email");
            return;
        }
        if (password !== password2) {
            alert("Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email,password).then(() => {
            alert("sign up successful");
            loginUser();
            let userId = firebase.auth().currentUser.uid;
            console.log("user id",userId);
            firebase.database().ref('/user/' + userId).set({username:username});

        }).catch((e) => alert(e));
    };

    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/user/' + userId).once('value').then((snapshot) => {
                let name = (snapshot.val() && snapshot.val().username) || '';
                connectUser(name,email);
            });

        }).catch((e) => alert("Login error",e));
    };

    return (
        <Container>
            <Form style={styles.container}>
                { showSingUp &&
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                            autocorrect={false}
                            autoCapitalize="none"
                            onChangeText={(value) => setUsername(value) }
                        />
                    </Item>
                }
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        autocorrect={false}
                        autoCapitalize="none"
                        onChangeText={(value) => setEmail(value) }
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        autocorrect={false}
                        autoCapitalize="none"
                        onChangeText={(value) => setPassword(value) }
                    />
                </Item>
                { showSingUp ?
                    <View>
                        <Item floatingLabel>
                            <Label>Confirm password</Label>
                            <Input
                                secureTextEntry={true}
                                autocorrect={false}
                                autoCapitalize="none"
                                onChangeText={(value) => setPassword2(value) }
                            />
                        </Item>
                        <Button dark block
                                style={[styles.btn, {marginTop: 20}]}
                                onPress={() => signUpUser()}
                        >
                            <Text style={styles.btnText}> Sign up </Text>

                        </Button>
                        <Button light block
                                style={styles.btn}
                                onPress={() => setShowSignUp(false)}
                        >
                            <Text style={styles.btnText}> Back to login </Text>
                        </Button>
                    </View>
                    :
                    <View>
                        <Button dark block
                                style={[styles.btn, {marginTop: 20}]}
                                onPress={() => loginUser()}
                        >
                            <Text style={styles.btnText}> Login </Text>
                        </Button>
                        <Button light block
                                style={styles.btn}
                                onPress={() => setShowSignUp(true)}
                        >
                            <Text style={styles.btnText}> Create an account </Text>
                        </Button>
                    </View>
                }

            </Form>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        padding: 15,
        // flex: 1,
    },
    btn: {
        // width: '100%',
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: 'white',
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);