import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profile from "@screens/Profile";
import MainNavigation from "./MainNavigation";

const Drawer = createDrawerNavigator();

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Profile')}
                title="Go to Profile"
            />
        </View>
    );
}

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Profile">
                <Drawer.Screen name="Home" component={MainNavigation} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerNavigation;