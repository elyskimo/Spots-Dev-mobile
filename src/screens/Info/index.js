import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";

const Info = (props) => {
    const { moods } = props;
    let total = moods.length,
        count = 0
    ;
    moods.forEach(mood => {
        count += mood.mood;
    });

    let global = count / total,
        globalText = ""
    ;

    switch (true) {
        case (global >= 4.5) :
            globalText = "Parfait";
            break;
        case (global < 4.5 && global >= 3.5) :
            globalText = "Bien";
            break;
        case (global < 3.5 && global >= 2.5) :
            globalText = "Normal";
            break;
        case (global < 2.5 && global >= 1.5) :
            globalText = "Pas bien";
            break;
        case (global < 1.5) :
            globalText = "Mal";
            break;
        default:
            globalText = "";
    }
    console.log('global',globalText, global < 4);

    return (
        <View>
            <Text style={styles.text}>Info component</Text>
            <Text style={styles.text}>Total : {total}</Text>
            <Text style={styles.text}>Global : {global.toFixed(2)} - {globalText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'blue',
        marginTop: 20,
        fontSize: 20,
        fontFamily: 'Arial',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => ({
    moods: state.moods.moods,
});

export default connect(mapStateToProps, null)(Info);