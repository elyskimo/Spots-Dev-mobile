import React from "react";
import { StatusBar, Text, View, TouchableOpacity, Image, StyleSheet} from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Map from "@screens/Map";
import List from "@screens/List";
import Profile from "@screens/Profile";
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const StackProfile = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabsNavigation = () => (
    <Tabs.Navigator
        initialRouteName="Main"
        tabBarOptions={{
            activeBackgroundColor: "#fff",
            inactiveBackgroundColor: "#fff",
            showLabel: true,
            showIcon: true,
            activeTintColor: "green",
            inactiveTintColor: "#828282",
        }}
        tabStyle={{
            flexDirection: "row",
        }}
    >
        <Tabs.Screen
            name="Main"
            component={Map}
            options={{
                title: () => (
                    <Icon name={"map-o"}
                          size={25}
                          color="#000"
                    />
                    ),
            }}
            listeners={({ navigation }) => ({
                tabPress: () => {
                    navigation.navigate("Main");
                },
            })}
        />
        <Tabs.Screen
            name="List"
            component={List}
            options={{
                title: () => (
                    <Icon name={"list"}
                          size={25}
                          color="#000"
                    />
                ),
            }}
            listeners={({ navigation }) => ({
                tabPress: () => {
                    navigation.navigate("List");
                },
            })}
        />
    </Tabs.Navigator>
);

const StackNavigation = (props) => {
    const { user } = props;
    const colorStatus = user.connected ? 'limegreen' : 'red';

    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={TabsNavigation}
                options={({ navigation }) => ({
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name={"bars"}
                                  size={25}
                                  color="#000"
                                  style={{
                                      marginLeft: 10,
                                  }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={styles.inline}>
                            <Text style={styles.title}>{user.username}</Text>
                            <Icon name={"circle"}
                                  size={10}
                                  color={colorStatus}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Profile")}
                            >
                                <Icon name={"user"}
                                      size={25}
                                      color="#000"
                                      style={{
                                          marginRight: 10,
                                      }}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            />
        </Stack.Navigator>
    );
}

const StackProfileNavigation = (props) => {
    const { user } = props;
    const colorStatus = user.connected ? 'limegreen' : 'red';

    return (
        <StackProfile.Navigator initialRouteName="Profile">
            <StackProfile.Screen
                name="Profile"
                component={Profile}
                options={({ navigation }) => ({
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name={"bars"}
                                  size={25}
                                  color="#000"
                                  style={{
                                      marginLeft: 10,
                                  }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={styles.inline}>
                            <Text style={styles.title}>{user.username}</Text>
                            <Icon name={"circle"}
                                  size={10}
                                  color={colorStatus}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Profile")}
                            >
                                <Icon name={"user"}
                                      size={25}
                                      color="#000"
                                      style={{
                                          marginRight: 10,
                                      }}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            />
        </StackProfile.Navigator>
    );
}

const MainNavigation = (props) => {
    const { user } = props;

    return (
        <NavigationContainer>
            <StatusBar
                hidden={false}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home"
                    // component={StackNavigation}
                >
                    {props => <StackNavigation {...props} user={user} />}
                </Drawer.Screen>
                <Drawer.Screen name="Profile"
                    // component={StackProfileNavigation}
                >
                    {props => <StackProfileNavigation {...props} user={user} />}
                </Drawer.Screen>

            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginRight: 5,
    },
    logo: {
        marginLeft: 20,
        width: 28,
        height: 28,
    },
    inline: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
    }
});

// export default MainNavigation;
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(MainNavigation);