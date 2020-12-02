import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {connect} from "react-redux";
// import { connectUser, disconnectUser } from "@redux/user/actions";
// import { bindActionCreators } from "redux";
import MapView, { Marker, Callout } from 'react-native-maps';
import { Item, Input, Icon, Button } from 'native-base';
import { FaMapMarkerAlt, FaBeer } from "react-icons/fa";

const Map = () => {


    const [searchValue, setSearchValue] = useState(false);
    const [isSettingSpot, setIsSettingSpot] = useState(false);
    const [region, setRegion] = useState({lat: 44.837987, lon: -0.57922, latD: 0.1, lonD: 0.1,});
    const [markers, setMarkers] = useState([
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
    ]);

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

    // const newSpot = () => {
    //   setIsSettingSpot(true);
    //   markers.push({name:"" ,latitude: region.lat,longitude: region.lon, type:"", url: ""});
    // };

    const regionChange = (r) => {
        setRegion({
            lat: r.latitude,
            lon: r.longitude,
            latD: r.latitudeDelta,
            lonD: r.longitudeDelta
        });
    };

    const cancelSpot = () => {
        setIsSettingSpot(false);
    };

    const saveSpot = () => {
        setIsSettingSpot(false);
        let newMarker = {name:"" ,latitude: region.lat,longitude: region.lon, type:"", url: ""};
        setMarkers([...markers,newMarker]);
    };

    // useEffect(() => {
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             console.warn(position.coords.latitude);
    //             console.warn(position.coords.longitude);
    //             this.setState({
    //                 region: {
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                     latitudeDelta: 0.02,
    //                     longitudeDelta: 0,
    //                 }
    //             });
    //         },
    //         (error) => {
    //             console.warn(error.code, error.message);
    //         },
    //         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    //     )
    // });

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     zoomEnabled={true}
                     showsUserLocation={true}
                     region={{
                         latitude:region.lat,
                         longitude:region.lon,
                         latitudeDelta:region.latD,
                         longitudeDelta:region.lonD
                     }}
                     onRegionChangeComplete={(r) => regionChange(r)}
            >
                {
                    markers.map((marker,key) =>(
                        <Marker key= {key}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
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
                                    {
                                        marker.type.length === 0 && (
                                            <Button block
                                                    color={getPinColor(marker.type)}
                                                    style={styles.popupBtn}
                                                    onPress={() => {console.log(marker.url)}}
                                            >
                                                <Text style={{color: "#fff",fontSize:20}}>Add info</Text>
                                            </Button>
                                        )
                                    }
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
            {
                isSettingSpot && (
                    <View style={{position: 'absolute', top: 0, bottom: 0,justifyContent: 'center', alignItems: 'center'}}>
                        <Icon type="MaterialCommunityIcons" name="map-marker" style={{fontSize: 35, color: 'black'}} />
                    </View>
                )

            }
            <View>
                {
                    isSettingSpot ?
                        <View style={{flexDirection: 'row',alignSelf: 'flex-start'}}>
                            <Button rounded danger style={{marginBottom: 15,marginHorizontal:5}} onPress={() => cancelSpot()}>
                                <Icon type="FontAwesome5" name="times"/>
                            </Button>
                            <Button rounded success style={{marginBottom: 15,marginHorizontal:5}} onPress={() => saveSpot()}>
                                <Icon type="FontAwesome5" name="check" style={{fontSize:18,}}/>
                            </Button>
                        </View>
                        :
                        <Button rounded dark style={{marginBottom: 15}} onPress={() => setIsSettingSpot(true)}>
                            <Icon type="MaterialCommunityIcons" name="plus"/>
                        </Button>
                }

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
