import React, { useState, useEffect, createContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
/////////////////////////////module imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';


////////////////////////////view imports
import Login from '../Views/Login'
import UpcomingMatches from '../Views/UpcomingMatches'
import MatchDetail from '../Views/MatchDetail'
import BottomTab from './BottomTab';

import EncryptedStorage from 'react-native-encrypted-storage';

import SplashScreen from 'react-native-splash-screen'
import { decodeUserJwt } from '../services/user';

export const authContext = createContext();

const Stack = createStackNavigator();
const MainStack = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const UserToken = async () => {
        try {
            const tokenObj = await EncryptedStorage.getItem('user-token');
            if (tokenObj) {
                setLoggedIn(true)
                SplashScreen.hide()
            }
            else {
                setLoggedIn(false)
                SplashScreen.hide()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        UserToken()
    }, [])
    return (
        <NavigationContainer>
            <authContext.Provider value={[loggedIn, setLoggedIn]}>

                <Stack.Navigator>
                    {loggedIn ?
                        <>
                            <Stack.Screen options={{ headerShown: false }} name="BottomTab" component={BottomTab} />
                            <Stack.Screen options={({ route }) => ({
                                headerShown: true,
                                headerStyle: {
                                    backgroundColor: '#1B0E5D',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: '700',
                                },
                                headerRight: () => (

                                    <TouchableOpacity>
                                        <Icon name="wallet" style={{ marginRight: 10 }} size={20} color="white" />
                                    </TouchableOpacity>
                                ),
                                headerTitle: () => {
                                    return (
                                        <View style={styles.flexColumn}>
                                            <View style={styles.flexRow}>
                                                <Text style={[styles.txtWhite, styles.heading]}>{route.params.first_team}</Text>
                                                <Text style={[styles.txtWhite, styles.vsTxt]}>vs</Text>
                                                <Text style={[styles.txtWhite, styles.heading]}>{route.params.second_team}</Text>
                                            </View>
                                            <Text style={styles.txtWhite}>{route.params.time}</Text>
                                        </View>
                                    )
                                }
                            })} name="MatchDetail" component={MatchDetail} />


                        </>
                        :
                        <>
                            
                            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                        </>

                    }
                </Stack.Navigator>
            </authContext.Provider>

        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start"
    },
    txtWhite: {
        color: "white",
    },
    heading: {
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    vsTxt: {
        fontSize: 12,
        marginHorizontal: 4,
        fontWeight: "bold"

    }
})

export default MainStack;