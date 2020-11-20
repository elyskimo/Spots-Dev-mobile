import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import {connect} from "react-redux";
// import { connectUser, disconnectUser } from "@redux/user/actions";
// import { bindActionCreators } from "redux";
import MapView, { Marker, Callout } from 'react-native-maps';

const Map = () => {

    const coordinates = [
        { name : '1', latitude: 44.837789 , longitude: -0.57918 },
        { name : '2', latitude: 44.858889, longitude: -0.59918 },
        { name : '3', latitude: 44.827789, longitude: -0.52918},
        { name : '4', latitude: 44.847789, longitude: -0.53918},
        { name : '5', latitude: 44.817789, longitude: -0.54918},
        { name : '6', latitude: 44.825789, longitude: -0.56918},
        { name : '7', latitude: 44.820789, longitude: -0.59918},
        { name : '8', latitude: 44.840789, longitude: -0.60999},
        { name : '9', latitude: 44.857789, longitude: -0.52918 },
        { name : '10', latitude: 44.867789, longitude: -0.54918},
    ];

    return (
        // <View style={styles.container}>
        //     <View style={styles.button}>
        //         <Text>Map screen</Text>
        //     </View>
        // </View>
        <View style={styles.container2}>
            <MapView style={styles.map}
                     region={{
                         latitude:44.837789,
                         longitude:-0.57918,
                         latitudeDelta:0.1,
                         longitudeDelta:0.1
                     }}
            >
                {
                    coordinates.map(marker =>(
                        <Marker key= {marker.name} coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}>
                        </Marker>
                    ))
                }
            </MapView>

            {/*<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Info')}>*/}
            {/*    <Animated.View style={[styles.button,styles.secondary, info,opacity]}>*/}
            {/*        <Entypo name="info" size={20} color="#F02A4B"/>*/}
            {/*    </Animated.View>*/}
            {/*</TouchableWithoutFeedback>*/}

            {/*<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Data')}>*/}
            {/*    <Animated.View style={[styles.button,styles.secondary, data,opacity]}>*/}
            {/*        <Entypo name="line-graph" size={20} color="#F02A4B"/>*/}
            {/*    </Animated.View>*/}
            {/*</TouchableWithoutFeedback>*/}

            {/*<TouchableWithoutFeedback onPress={this.toggleMenu}>*/}
            {/*    <Animated.View style={[styles.button, styles.menu, rotation, opacity]}>*/}
            {/*        <AntDesign name="plus" size={24} color="#FFF"/>*/}
            {/*    </Animated.View>*/}
            {/*</TouchableWithoutFeedback>*/}

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
    },
    container2: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
});


export default Map;
