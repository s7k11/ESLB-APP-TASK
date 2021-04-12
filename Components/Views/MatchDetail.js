import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MatchDetail(props) {

    const [megaContestArr, setMegaContestArr] = useState([1, 2]);
    const [hotContestArr, setHotContestArr] = useState([1, 2]);

    const renderMegaContests = ({ item, index }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.topCard}>
                    <View style={styles.cardInnerFlexColumn}>
                        <View style={styles.cardInnerFlexRow}>
                            <Text style={[styles.topCardInnerTextWithMargin, styles.megaSubheadingText]}>Total Winning</Text>
                            <Text style={[styles.topCardInnerTextWithMargin, styles.megaSubheadingText]}>WINNERS</Text>
                        </View>
                    </View>
                    <View style={styles.cardInnerFlexColumn}>
                        <View style={styles.cardInnerFlexRow}>
                            <Text style={[styles.topCardInnerMainHeadingLeft]}>{item == 1 ? 'Rs. 50 Lakh' : 'Rs. 15 Lakh'}</Text>
                            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <Text style={[styles.topCardInnerMainHeadingRight,{marginRight:2}]}>{item == 1 ? '100000' : '115000'}</Text>
                                <Image source={require('../Assets/down-arrow.png')} style={{height:10,width:10}} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardInnerFlexColumn}>
                        <View style={styles.cardInnerFlexRow}>
                            <View style={[styles.activeProgress]}></View>
                            <View style={[styles.inactiveProgress]}></View>
                        </View>
                    </View>
                    <View style={styles.cardInnerFlexColumn}>
                        <View style={styles.cardInnerFlexRow}>
                            <Text style={[styles.megaSubheadingText]}>166970 left</Text>
                            <Text style={[styles.megaSubheadingText]}>200000 Teams</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomCard}>
                    <View style={styles.cardInnerFlexColumn}>
                        <View style={[styles.cardInnerFlexRow, { marginTop: 15,marginBottom:5, paddingHorizontal: 0 }]}>
                            <View style={[styles.cardInnerFlexRow, { paddingHorizontal: wp(1) }]}>
                                <TouchableOpacity style={styles.bottomCardLeftBtn}><Text style={styles.bottomCardLeftBtnText}>C</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.bottomCardLeftBtn}><Text style={styles.bottomCardLeftBtnText}>M</Text></TouchableOpacity>
                            </View>
                            <View style={styles.cardInnerFlexRow}>
                                <Text style={styles.megaSubheadingText}>Join Free</Text>
                                <TouchableOpacity style={styles.bottomCardRightBtn}><Text style={styles.textWhite}>{item == 1 ? '₹ 34' : '₹ 10'}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>


            </View>

        )
    }

    return (
        
            <View style={{ backgroundColor: '#F7F6FB',flex:1 }}>

                {/* ///////all contacts btn at the top */}
                <TouchableOpacity style={styles.allContentContainer}>
                    <Text style={styles.textWhite}>All Contests</Text>
                    <Image source={require('../Assets/next.png')} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>

                {/*Mega Cards Starts Here */}
                <View >



                    {/* ////////////flatlist this is used to dynamically display the data we have  */}
                    <FlatList
                        data={megaContestArr}
                        renderItem={renderMegaContests}
                        keyExtractor={(item, index) => `${index}`}
                        scrollEnabled={true}
                        ListHeaderComponent={() => {
                            return (
                                <View style={styles.megaCardContainer}>
                                    <View style={styles.megaCardHeader}>
                                        <Image source={require('../Assets/police-badge.png')} style={{ height: 40, width: 40 }} />
                                        <View style={styles.megaCardHeaderTextContainer}>
                                            <Text style={styles.megaHeadingText}>Mega Contest</Text>
                                            <Text style={styles.megaSubheadingText}>Get ready for mega winnings!</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }

                        }

                        //////////////////////////this is used to render multiple flatlist and this is done 
                        ListFooterComponent={() => {
                            return (
                                <View style={{ marginBottom: hp(10) }}>
                                    <View style={styles.megaCardContainer}>
                                        <View style={styles.megaCardHeader}>
                                            <Image source={require('../Assets/police-badge.png')} style={{ height: 40, width: 40 }} />
                                            <View style={styles.megaCardHeaderTextContainer}>
                                                <Text style={styles.megaHeadingText}>Hot Contest</Text>
                                                <Text style={styles.megaSubheadingText}>Get ready for mega winnings!</Text>
                                            </View>
                                        </View>


                                    </View>
                                    <FlatList
                                        data={hotContestArr}
                                        renderItem={renderMegaContests}
                                        keyExtractor={(item, index) => `${index}`}
                                        scrollEnabled={false}
                                        style={{marginBottom:60}}
                                    />
                                </View>
                            )
                        }}
                    />

                </View>
                <View style={[styles.bottomTabContainer, styles.flexRow]}>
                    <View style={styles.bottomTabLeftBtnContainer}>
                        <TouchableOpacity style={[styles.flexRow, { justifyContent: "space-around", }]}>
                            <Text style={styles.BottomTabName}>My Contacts</Text>
                            <Text style={styles.BottomTabName}>(2)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "50%" }}>
                        <TouchableOpacity style={[styles.flexRow, { justifyContent: "space-around" }]}>
                            <Text style={styles.BottomTabName}>My Play</Text>
                            <Text style={styles.BottomTabName}>(2)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    allContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#1B0E5D',
        paddingHorizontal: wp(5),
        width: wp(95),
        alignSelf: 'center',
        paddingVertical: hp(1.5),
        marginVertical: hp(2),
        justifyContent: 'space-between',
        borderRadius: 5,
        alignItems: 'center'
    },
    textWhite: {
        color: 'white'
    },
    megaCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: wp(95),
        alignSelf: 'center',
        marginVertical: hp(1)
    },
    megaCardHeader: {
        flexDirection: 'row',
    },
    megaCardHeaderTextContainer: {
        flexDirection: 'column',
        paddingHorizontal: wp(3)
    },
    megaHeadingText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#666'
    },
    megaSubheadingText: {
        fontSize: 12,
        color: '#999'
    },
    cardContainer: {
        marginVertical: hp(2),
    },
    topCard: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom:15,
        width: wp(95),
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    bottomCard: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        alignSelf: 'center',
        width: wp(90),
        paddingVertical: 3,
        marginTop: hp(-1),
        backgroundColor: '#F6F5FA',
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    cardInnerFlexColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    cardInnerFlexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),

    },
    topCardInnerTextWithMargin: {
        marginTop: hp(1.5)
    },
    topCardInnerMainHeadingLeft: {
        fontSize: 16,
        fontWeight: '700',
        color: '#474747',
    },
    topCardInnerMainHeadingRight: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1B0E5D',
    },
    inactiveProgress: {
        backgroundColor: '#EEEEEE',
        width: wp(55),
        paddingVertical: 1.5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 5,
        borderBottomEndRadius: 5,
    },
    activeProgress: {
        backgroundColor: '#1B0E5D',
        width: wp(30),
        paddingVertical: 1.5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    bottomCardLeftBtn: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#6E6E6E',
        paddingHorizontal: wp(1),
        marginHorizontal: wp(1),
    },
    bottomCardLeftBtnText:{
        color:'#6E6E6E'
    },
    bottomCardRightBtn: {
        borderRadius: 5,
        backgroundColor: '#1B0E5D',
        paddingHorizontal: wp(3),
        marginLeft: wp(3),
    },
    bottomTabContainer: {
        backgroundColor: "#1B0E5D",
        position: "absolute",
        paddingVertical: 10,
        paddingHorizontal: 10,
        bottom: 0
    },
    bottomTabLeftBtnContainer: {
        width: "50%",
        borderRightWidth: 1,
        borderColor: "white"
    },
    flexRow: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 10,
        width: "100%"
    },
    BottomTabName: {
        color: "white"
    },
})