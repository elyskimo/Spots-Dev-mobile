import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from "react-redux";
import { connectUser, disconnectUser } from "@redux/user/actions";
import { bindActionCreators } from "redux";
import Login from "@components/Login";
import UserProfile from "@components/UserProfile";

const Profile = (props) => {
    const { connectUser, disconnectUser, user } = props;

    const _toggleStatus = () => {
        if (!user.connected) {
            connectUser();
        } else {
            disconnectUser();
        }
    }

    return (
        <View style={styles.container}>
            { user.connected ? <UserProfile/> : <Login/> }

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
