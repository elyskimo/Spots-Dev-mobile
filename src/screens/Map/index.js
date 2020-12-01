import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {connect} from "react-redux";
// import { connectUser, disconnectUser } from "@redux/user/actions";
// import { bindActionCreators } from "redux";
import MapView, { Marker, Callout } from 'react-native-maps';
import { Item, Input, Icon, Button } from 'native-base';
import { FaMapMarkerAlt, FaBeer } from "react-icons/fa";

const Map = () => {

    const markers = [
        { name : '1', latitude: 44.837789 , longitude: -0.57918 , type: "cafe", url: "www.google.fr"},
        { name : '2', latitude: 44.858889, longitude: -0.59918 , type: "bakery", url: "www.google.fr"},
        { name : '3', latitude: 44.827789, longitude: -0.52918, type: "bar", url: "www.google.fr"},
        { name : '4', latitude: 44.847789, longitude: -0.53918, type: "store", url: "www.google.fr"},
        { name : '5', latitude: 44.817789, longitude: -0.54918, type: "park", url: "www.google.fr"},
        { name : '6', latitude: 44.825789, longitude: -0.56918, type: "museum", url: ""},
        { name : '7', latitude: 44.820789, longitude: -0.59918, type: "pharmacy", url: ""},
        { name : '8', latitude: 44.840789, longitude: -0.60999, type: "post_office", url: ""},
        { name : '9', latitude: 44.857789, longitude: -0.52918 , type: "school", url: ""},
        { name : '10', latitude: 44.867789, longitude: -0.54918, type: "restaurant", url: ""},
    ];

    const [searchValue, setSearchValue] = useState(false);

    const search = () => {
      console.log('search',searchValue)  ;
    };

    const getPinColor = (type) => {
        let color = "";
        switch(type) {
            case "cafe" :
                color = "brown";
                break;
            case "bakery" :
                color = "gray";
                break;
            case "bar" :
                color = "red";
                break;
            case "store" :
                color = "blue";
                break;
            case "park" :
                color = "green";
                break;
            case "museum" :
                color = "darkblue";
                break;
            case "pharmacy" :
                color = "limegreen";
                break;
            case "post_office" :
                color = "gold";
                break;
            case "school" :
                color = "purple";
                break;
            case "restaurant" :
                color = "orange";
                break;
            default :
                color = "black";
        }

        return color;
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     zoomEnabled={true}
                     region={{
                         latitude:44.837789,
                         longitude:-0.57918,
                         latitudeDelta:0.1,
                         longitudeDelta:0.1
                     }}
            >
                {
                    markers.map(marker =>(
                        <Marker key= {marker.name}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
                                description={() => <View><Text>hello</Text></View>}
                        >
                            <View>
                                <Icon type="MaterialCommunityIcons" name="map-marker" style={{fontSize: 35, color: getPinColor(marker.type)}} />
                            </View>
                            <MapView.Callout>
                                <View style={styles.popup}>
                                    <View style={styles.popupDesc}>
                                        <Text>Name: { marker.name }</Text>
                                        <Text>Category: { marker.type }</Text>
                                    </View>
                                    { marker.url.length>0 && (
                                        <Button block
                                                color={getPinColor(marker.type)}
                                                style={styles.popupBtn}
                                                onPress={() => {console.log(marker.url)}}
                                        >
                                            <Text style={{color: "#fff",fontSize:20}}>Go to</Text>
                                        </Button>
                                    )}
                                </View>
                            </MapView.Callout>

                        </Marker>
                    ))
                }
            </MapView>
            <View style={styles.searchView}>
                <Item style={styles.searchbar}>
                    <Input placeholder="Search" onChangeText={(text) => setSearchValue(text)} />
                    <Button transparent light onPress={() => search()}>
                        <Icon name="ios-search" />
                    </Button>
                </Item>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container2: {
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
    container: {
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
    searchbar: {
        // marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        height: 45,
    },
    searchView: {
        position: 'absolute',
        top: 10,
        width: '90%'
    },
    popup: {
        minWidth: 200,
        padding: 10,
    },
    popupBtn: {
        justifyContent: "center",
        alignItems: "center",
    },
    popupDesc: {
        padding: 5,
    }
});


export default Map;
