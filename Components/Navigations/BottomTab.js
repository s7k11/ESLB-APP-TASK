import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpcomingMatches from '../Views/UpcomingMatches';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function BottomTab() {
    const Tab = createBottomTabNavigator();
    return (


        /////////////////navigation Container
        <Tab.Navigator
            /////////////////this is to configure the appearence and the tab name of each tab according to the current focused tab
            screenOptions={({ route }) => ({
                /////////////////this is to configure the tab name of each tab according to the current focused tab

                tabBarLabel: ({ focused, name }) => {
                    let tabFocused;
                    if (route.name === 'UpcomingMatches') {
                        tabFocused = focused ? "Home" : ""
                    }
                    else if (route.name === 'Trophies') {
                        tabFocused = focused ? "Trophies" : ""
                    }
                    else if (route.name === 'Time') {
                        tabFocused = focused ? "Time" : ""
                    }
                    else if (route.name === 'More') {
                        tabFocused = focused ? "More" : ""
                    }
                    return <Text style={{ color: "#D8B768", fontSize: 12, paddingBottom: 5 }}>{tabFocused}</Text>;
                },
                /////////////////this is to configure the appearence (icon , icon color, size) of each tab according to the current focused tab

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'UpcomingMatches') {
                        iconName = focused
                            ? 'home'
                            : 'home';

                        color = focused ? "#D8B768" : "#b0b0b0";
                        size = focused ? 18 : 18;

                    } else if (route.name === 'Trophies') {
                        iconName = focused
                            ? 'trophy'
                            : 'trophy';

                        color = focused ? "#D8B768" : "#b0b0b0";
                        size = focused ? 18 : 18;
                    }

                    else if (route.name === 'Time') {
                        iconName = focused
                            ? 'hourglass-start'
                            : 'hourglass-start';

                        color = focused ? "#D8B768" : "#b0b0b0";
                        size = focused ? 18 : 18;
                    }

                    else if (route.name === 'More') {
                        iconName = focused
                            ? 'ellipsis-h'
                            : 'ellipsis-h';

                        color = focused ? "#D8B768" : "#b0b0b0";
                        size = focused ? 18 : 18;
                    }
                    // You can return any component that you like here!
                    /////////////////this is the icon
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}

            //////////////////this is basic tab bar styling
            tabBarOptions={{
                tabStyle: { paddingTop: 3 },
                inactiveBackgroundColor: "#e6e6e6",
                activeBackgroundColor: "#e6e6e6",
            }}

        >


            {/* ////////////////tab screens, these have different routes but same components because , I didn't have any other ui so the redirected page would have been empty but in real world scenario these will be different files (components) */}
            <Tab.Screen name="UpcomingMatches" screenOptions component={UpcomingMatches} />
            <Tab.Screen name="Trophies" component={UpcomingMatches} />
            <Tab.Screen name="Time" component={UpcomingMatches} />
            <Tab.Screen name="More" component={UpcomingMatches} />
        </Tab.Navigator>
    )
}
