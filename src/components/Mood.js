import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeMood } from "@redux/moods/actions";

const Mood = (props) => {

    // const { id, title, mood } = props;
    const getColor = (mood) => {
        const colors = ['purple','red','orange','yellow','green'];
        return colors[mood-1];
    };

    const getHeight = (mood) => {
        const heights = ['20%','40%','60%','80%','100%'];
        return heights[mood-1];
    };

    const _removeMood = (id) => {
        Alert.alert(
            "Êtes-vous sûr ?",
            "Vous être sur le point de supprimer votre Mood.",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        props.removeMood(id);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <TouchableOpacity style={[styles.bckground, { backgroundColor: getColor(props.mood), width: getHeight(props.mood)}]}
                          onLongPress={() => _removeMood(props.id)}
        >
            <Text style={styles.text} key={props.id}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        // backgroundColor: 'lightgrey',
        // marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bckground: {
        // flex: 1,
        // minWidth: '100%',
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            removeMood,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(Mood);