import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from "react-redux";
import { connectUser, disconnectUser } from "@redux/user/actions";
import { bindActionCreators } from "redux";

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
            <View style={styles.button}>
                <Button onPress={_toggleStatus}
                        title={user.connected ? "Déconnexion" : "Connexion"}
                />
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
