import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { Card, CardItem, Left, Right, Icon, Body, Button} from "native-base";
import {connect} from "react-redux";
import CATEGORIES from "../../config/store";
import * as WebBrowser from 'expo-web-browser';

const List = (props) => {
    const { spots } = props;

    const getPinColor = (type) => {
        let category = CATEGORIES[type];
        return category ? category.color : 'silver';
    };

    const openUrl = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={{width:'90%',paddingBottom: 15,}}
                data={spots}
                renderItem={({ item }) => (
                    <Card style={{borderRadius:15}}>
                        <CardItem style={{borderRadius:15}}>
                            <Left>
                                <Icon type="MaterialCommunityIcons" name="map-marker" style={{fontSize: 40, color: getPinColor(item.type)}} />
                                <Body style={{width:'100%'}}>
                                    <Text style={styles.listItem}>{item.name}</Text>
                                    <Text note>{CATEGORIES[item.type].label}</Text>
                                </Body>
                            </Left>
                            {
                                item.url.length > 0 && (
                                <Right style={{maxWidth:'20%'}}>
                                    <Button dark rounded onPress={() => openUrl(item.url)}>
                                        <Icon type="MaterialCommunityIcons" name="web"></Icon>
                                    </Button>
                                </Right>
                                )
                            }
                        </CardItem>
                    </Card>
                )}
                keyExtractor={item => item.name}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});

const mapStateToProps = (state) => ({
    spots: state.spot.spots,
});

export default connect(mapStateToProps, null)(List);
