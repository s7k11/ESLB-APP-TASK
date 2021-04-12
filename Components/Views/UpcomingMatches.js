import React, { useState, useEffect,useContext } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SliderBox } from "react-native-image-slider-box";

import { getBanners } from '../services/Banners';
import { getUpcomingMatch } from '../services/UpcomingMatch';
import { logout } from '../services/user';
import { useIsFocused } from '@react-navigation/core';
import { authContext } from '../Navigations/MainStack';

export default function UpcomingMatches(props) {
    const [bannerArr, setBannerArr] = useState([]);
    const [upcomingMatchArr, setUpcomingMatchArr] = useState([]);

    let isFocused=useIsFocused()
    const [matchArr, setMatchArr] = useState([]);
    const [toggleHeader, setToggleHeader] = useState(true);

    const [loggedIn, setLoggedIn] = useContext(authContext);

    const handleLogout=()=>{
        try {
            Alert.alert(
                "Alert",
                "Do you really want to logout ?",
                [
                  {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Yes", onPress: async() => {
                      await logout();
                     setLoggedIn(false)
                  } }
                ]
              );
        } catch (error) {
            console.log(error)
        }
    }

    const getBanner = async () => {
        try {
            console.log("sdfghjk")
            const res = await getBanners();
            if (res.status === 200) {
                setBannerArr(res.banner.map(el => el.banner_img))
            }
        } catch (error) {
            console.log(error)
        }
    }



    const getUpcomingMatches = async () => {
        try {
            const res = await getUpcomingMatch();
            if (res.status === 200) {
                // team abbrevation generate from team name
                let tempArr = res.match;
                tempArr = tempArr.map(el => {
                    let tempEl = el.first_team[0].team_name;
                    let tempElSplitArr = tempEl.split(' ');
                    if (tempElSplitArr.length > 1) {
                        tempEl = `${tempElSplitArr[0].charAt(0).toUpperCase()}` + `${tempElSplitArr[1].charAt(0).toUpperCase()}`
                        // console.log(tempEl)
                    }
                    else {
                        tempEl = `${tempEl.charAt(0).toUpperCase()}${tempEl.charAt(1).toUpperCase()}${tempEl.charAt(2).toUpperCase()}`
                        // console.log(tempEl)
                    }
                    el.first_team[0].team_abbrevation = tempEl;
                    // 
                    let tempElSecond = el.second_team[0].team_name;
                    let tempElSecondSplitArr = tempEl.split(' ');
                    if (tempElSecondSplitArr.length > 1) {
                        tempElSecond = `${tempElSecondSplitArr[0].charAt(0).toUpperCase()}` + `${tempElSecondSplitArr[1].charAt(0).toUpperCase()}`
                    }
                    else {
                        tempElSecond = `${tempElSecond.charAt(0).toUpperCase()}${tempElSecond.charAt(1).toUpperCase()}${tempElSecond.charAt(2).toUpperCase()}`
                    }
                    el.second_team[0].team_abbrevation = tempElSecond
                    return el
                })
                setUpcomingMatchArr([...tempArr])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(isFocused){
            getBanner();
            getUpcomingMatches();
        }
        return ()=>{
            isFocused=false;
        }
    }, [isFocused])

    const renderUpcomingMatch = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('MatchDetail', { first_team: item?.first_team[0]?.team_abbrevation,second_team: item?.second_team[0]?.team_abbrevation,time:`${item?.batting_start_time.split(':')[0]+'h' + ' ' +item?.batting_start_time.split(':')[1]+'m'}`})} style={styles.card}>
                <View>
                    <Text style={[styles.textCenter, styles.inactiveHeaderText, styles.cardHeaderText]}>{item?.league_name}</Text>
                </View>
                <View style={styles.headerInnerBottom}>
                    <Image source={{ uri: item?.first_team[0]?.team_logo }} style={{ height: 25, width: 25 }} />

                    <Text style={styles.cardTeamName}>{item?.first_team[0]?.team_abbrevation}</Text>

                    <Image source={require('../Assets/image4.png')} style={{ height: 20, width: wp(40) }} />

                    <Text style={styles.cardTeamName}>{item?.second_team[0]?.team_abbrevation}</Text>

                    <Image source={{ uri: item?.second_team[0]?.team_logo }} style={{ height: 25, width: 25 }} />
                </View>
                <View>
                    <Text style={[styles.textCenter, styles.cardTeamName]}>{item?.batting_start_time.split(':')[0]+'h' + ' ' +item?.batting_start_time.split(':')[1]+'m'}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{ flex: 1, display: 'flex' }}>
            <View style={styles.header}>
                <View style={styles.headerInner}>
                    <TouchableOpacity onPress={()=>handleLogout()}>
                        <Image source={require('../Assets/user1.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Image source={require('../Assets/image3.png')} style={{ height: 50, width: wp(40), resizeMode: 'cover' }} />
                    <TouchableOpacity>

                        <Image source={require('../Assets/notification.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerInnerBottom}>
                    <TouchableOpacity onPress={() => setToggleHeader(true)}>
                        <Text style={[styles.headerText, toggleHeader ? styles.activeHeaderText : styles.inactiveHeaderText]}>CRICKET</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleHeader(false)}>
                        <Text style={[styles.headerText, !toggleHeader ? styles.activeHeaderText : styles.inactiveHeaderText]}>KABBADI</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.middleContainer}>
                <View style={styles.middleSlideContainer}>
                    <SliderBox
                        images={bannerArr}
                        sliderBoxHeight={hp(20)}
                        ImageComponentStyle={{ width: wp(93) }}
                        // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor="#D8B768"
                        inactiveDotColor="#6E6E6E"
                        autoplay={true}
                        circleLoop={true}
                    />
                </View>
                <View style={styles.matchContainer}>
                    <View style={styles.matchHeadingContainer}>
                        <Text style={styles.matchHeadingText}>Upcoming Matches</Text>
                    </View>

                </View>
                <FlatList
                    data={upcomingMatchArr}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderUpcomingMatch}
                    scrollEnabled={true}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'column',
        // height: 131,
        backgroundColor: '#1B0E5D',

    },
    headerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: wp(4),
    },
    headerInnerBottom:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: wp(4),
    },  
    headerText: {
        fontSize: 20,
        textTransform: 'uppercase'
    },
    activeHeaderText: {
        color: '#D8B768',
        borderBottomWidth: 3,
        borderBottomColor: '#D8B768'
    },
    inactiveHeaderText: {
        color: '#6E6E6E',
    },

    /////////////////middle container styles
    middleContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8F8F8',
        // marginHorizontal:wp(5)
        flex: 1
    },
    middleSlideContainer: {
        marginVertical: hp(1)
    },
    matchContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
    },
    matchHeadingContainer: {
        alignItems: 'center'
    },
    matchHeadingText: {
        fontSize: 17,
        fontWeight: '500',
        textTransform: 'uppercase'
    },

    // card
    card: {
        height: hp(13),
        backgroundColor: 'white',
        marginHorizontal: wp(4),
        marginVertical: hp(0.8),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    textCenter: {
        textAlign: 'center'
    },
    cardTeamName: {
        fontWeight: '700',
        fontSize: 14,
        color: '#000'
    },
    cardHeaderText: {
        fontSize: 10
    }

})
