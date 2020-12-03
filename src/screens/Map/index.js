import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addSpot, setSpots } from "@redux/spot/actions";
import MapView, { Marker, Callout } from 'react-native-maps';
import {Item, Input, Icon, Button, Label, Picker} from 'native-base';
import * as firebase from "firebase";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import CATEGORIES from "@config/store";

const Map = (props) => {

    const { addSpot, setSpots, spots, user } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [spotName, setSpotName] = useState("");
    const [spotType, setSpotType] = useState("");
    const [spotUrl, setSpotUrl] = useState("");
    const [spotToModal, setSpotToModal] = useState({ name : '', latitude: 44.837789 , longitude: -0.57918 , type: "", url: ""});
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
        { name : '9', latitude: 44.857789, longitude: -0.52918 , type: "night_club", url: ""},
        { name : '10', latitude: 44.867789, longitude: -0.54918, type: "restaurant", url: ""},
    ]);

    const search = () => {
      console.log('search',searchValue)  ;
    };

    const getPinColor = (type) => {
        let category = CATEGORIES[type];
        return category ? category.color : 'silver';
    };

    const regionChange = (r) => {
        setRegion({
            lat: r.latitude,
            lon: r.longitude,
            latD: r.latitudeDelta,
            lonD: r.longitudeDelta
        });
    };

    const saveSpot = () => {
        let tmpSpot = spotToModal;

        tmpSpot.name = spotName;
        tmpSpot.type = spotType;
        tmpSpot.url = spotUrl;

        // addSpot(tmpSpot);
        setMarkers([...markers,tmpSpot]);
        addSpot(tmpSpot);

        setModalVisible(false);
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/spot/' + userId).push(tmpSpot).then(() => {
            setSpotName("");
            setSpotType("");
            setSpotUrl("");
        });

    };

    const openModal = () => {
        setIsSettingSpot(false);
        let newMarker = {name:"" ,latitude: region.lat,longitude: region.lon, type:"", url: ""};
        setSpotToModal(newMarker);
        setModalVisible(true);
    };

    const cancelModal = () => {
        setIsSettingSpot(false);
        setModalVisible(false);
    };

    const loadSpots = () => {
        firebase.database().ref().child('spot').once('value').then(res => {
            const vals = res.val();
            let tmpSpots = [];
            for (let uid in vals) {
                Object.entries(vals[uid]).map(([key,val]) => {
                    let s = val;
                    s.uid = uid;
                    tmpSpots.push(s);
                })

            }
            setMarkers(tmpSpots);
            setSpots(tmpSpots);
        });
    }

    const openUrl = async (url) => {
        console.log('tvoja mamamaaaaa');
        await WebBrowser.openBrowserAsync(url);
    }
    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setRegion({lat: position.coords.latitude, lon: position.coords.longitude, latD: 0.1, lonD: 0.1,})
            },
            error => {console.log(error);},
            {enableHighAccuracy: true, timeout: 2000, maximumAge:1000}
        );
        loadSpots();

    },[]);

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
                            <Callout>
                                <View style={styles.popup}>
                                    <View style={{padding:5}}>
                                        <Text>Name: { marker.name }</Text>
                                        <Text>Category: { marker.type }</Text>
                                    </View>
                                    { marker.url.length>0 && (
                                        <Button block
                                                style={[styles.popupBtn,{color:getPinColor(marker.type)}]}
                                                onPress={() => openUrl(marker.url)}
                                        >
                                            <Text style={{color: "#fff",fontSize:20}}>Web site</Text>
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
                            </Callout>

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
                        <Text>Move the map to place the marker</Text>
                        <Icon type="MaterialCommunityIcons" name="map-marker" style={{fontSize: 35, color: 'black'}} />
                    </View>
                )

            }
            <View>
                {
                    isSettingSpot ?
                        <View style={{flexDirection: 'row',alignSelf: 'flex-start'}}>
                            <Button rounded danger style={{marginBottom: 15,marginHorizontal:10}} onPress={() => setIsSettingSpot(false)}>
                                <Icon type="FontAwesome5" name="times"/>
                            </Button>
                            <Button rounded success style={{marginBottom: 15,marginHorizontal:10}} onPress={() => openModal()}>
                                <Icon type="FontAwesome5" name="check" style={{fontSize:18,}}/>
                            </Button>
                        </View>
                        :
                        <Button rounded dark style={{marginBottom: 15}} onPress={() => setIsSettingSpot(true)}>
                            <Icon type="MaterialCommunityIcons" name="plus"/>
                        </Button>
                }

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>NEW SPOT</Text>
                        <Item floatingLabel style={styles.modalItem}>
                            <Label>Spot name</Label>
                            <Input
                                autocorrect={false}
                                autoCapitalize="none"
                                value={spotName}
                                onChangeText={(val) => setSpotName(val)}
                            />
                        </Item>
                        <Item picker style={styles.modalItem}>
                            <View style={{maxWidth:'100%'}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: '100%' }}
                                    placeholder="Category"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={spotType}
                                    onValueChange={(val) => setSpotType(val) }
                                >
                                    {
                                        Object.entries(CATEGORIES).map(([key,cat]) => (
                                            <Picker.Item label={cat.label} value={key}/>
                                        ))
                                    }
                                </Picker>
                            </View>
                        </Item>
                        <Item floatingLabel style={[styles.modalItem,{marginBottom:20}]}>
                            <Label>Web site URL</Label>
                            <Input
                                autocorrect={false}
                                autoCapitalize="none"
                                value={spotUrl}
                                onChangeText={(val) => setSpotUrl(val)}
                            />
                        </Item>
                        <Button block success onPress={() => saveSpot()} style={{marginVertical:5}}>
                            <Text style={{color: '#fff',fontWeight: 'bold', fontSize:16}}>Create</Text>
                        </Button>
                        <Button block danger onPress={() => cancelModal()} style={{marginVertical:5}}>
                            <Text style={{color: '#fff',fontWeight: 'bold', fontSize:16}}>Cancel</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalItem: {
        marginVertical: 5,
        width: '80%'
    }
});


// export default Map;
const mapStateToProps = (state) => ({
    spots: state.spot.spots,
    user: state.user,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addSpot,
            setSpots
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Map);
