import React, { useState, useEffect,useContext } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { userLogin,decodeUserJwt } from '../services/user';
import { authContext } from '../Navigations/MainStack';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/core';

export default function Login(props) {

    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [secureEntryToggle, setSecureEntryToggle] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loggedIn, setLoggedIn] = useContext(authContext);

    let isFocused=useIsFocused()

    //login handler
    const handleLogin = async () => {
        try {
            let obj = {
                email, password
            }
            const {data:res} = await userLogin(obj);
            console.log(res.data)
            setPasswordModalVisible(!passwordModalVisible)
            if (res.success) {
                await EncryptedStorage.setItem('user-token', res.data.token)
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Logged In Successfully'
                })
                setLoggedIn(true)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Invalid Email Or Password'
                })
            }



        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.error
            })
        }
    }

    // const checkLogin=async()=>{
    //     try {
    //         let decodedObj=await decodeUserJwt();
    //         if(decodedObj){
    //             props.navigation.navigate('BottomTab')
                
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    useEffect(()=>{
        if(isFocused){
        }
        return ()=>{
            isFocused=false;
            setEmail(''),
            setPassword('')
        }
    }, [isFocused])

    return (

        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1, display: 'flex' }} enabled={true}>

                {/* ////////////////////////// Top Image */}
                <Image source={require('../Assets/imageTop.png')} style={styles.topImage} />


                {/* Middle Content */}
                <View style={styles.loginContainer}>
                    <View style={styles.loginHeadingContainer}>
                        <Text style={styles.loginHeadingText}>LOGIN</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputStyles} value={email} onChangeText={(val) => setEmail(val)} returnKeyType="next" onSubmitEditing={() => setPasswordModalVisible(true)} placeholder="Enter your Email" placeholderTextColor="#6E6E6E" keyboardType="email-address" />
                    </View>

                    <View style={styles.orContainer}>
                        <Text style={styles.orText}>Or</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputStyles} placeholder="Enter your phone no" placeholderTextColor="#6E6E6E" keyboardType="number-pad" />
                    </View>

                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => setPasswordModalVisible(true)}>
                            <Text style={styles.whiteText}>LOGIN</Text>
                        </TouchableOpacity>
                        <View style={styles.registerTextContainer}>
                            <Text style={styles.registerNotText}>Not a member ? <Text style={styles.registerText}>Register</Text></Text>
                        </View>
                    </View>

                </View>

                {/* ////////////////////////////////////// Bottom Image */}
                <View style={styles.bottomImageContainer}>
                    <Image source={require('../Assets/imagesbottom.png')} style={styles.bottomImage} />
                </View>

                {/* // modal */}

                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={passwordModalVisible}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            setPasswordModalVisible(!passwordModalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.passwordInputContainer}>
                                    <TextInput style={styles.passwordInputStyles} value={password} onChangeText={(val) => setPassword(val)} placeholder="Enter your password" placeholderTextColor="#6E6E6E" secureTextEntry={secureEntryToggle} />

                                    <TouchableOpacity onPress={() => setSecureEntryToggle(!secureEntryToggle)}>
                                        {secureEntryToggle ?
                                            <Image source={require('../Assets/visibility.png')} style={{ height: 20, width: 20 }} />

                                            :
                                            <Image source={require('../Assets/view.png')} style={{ height: 20, width: 20 }} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={[styles.loginButtonContainer, { alignSelf: 'flex-end', marginHorizontal: wp(5) }]}
                                    onPress={() => handleLogin()}
                                >
                                    <Text style={styles.whiteText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
            </KeyboardAvoidingView>
        </View>





    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    topImage: {
        alignSelf: 'flex-end'
    },
    bottomImage: {
        // position:'absolute',
        // bottom:0
        // alignSelf:'flex-end',justifyContent:'flex-end' styles if any
    },
    bottomImageContainer: {
        // backgroundColor:'red',
        position: 'absolute',
        bottom: 0
    },

    loginContainer: {
        height: hp(55)
    },
    loginHeadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor:'red'
    },
    loginHeadingText: {
        fontSize: 30,
        color: '#1B0E5D',
        paddingHorizontal: wp(8),
        paddingVertical: wp(8),
        fontWeight: 'bold'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent:'center',
        // alignItems:'center',
        marginHorizontal: wp(8),
        marginVertical: hp(2),
        // backgroundColor:'red'
    },
    passwordInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        marginHorizontal: wp(8),
        marginVertical: hp(2),
        // backgroundColor:'red'
        borderWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderColor: '#1B0E5D',

    },
    inputStyles: {
        borderColor: '#1B0E5D',
        width: wp(84),
        borderWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        color: '#6E6E6E'
    },
    passwordInputStyles: {
        width: wp(70),

        color: '#6E6E6E'
    },
    orContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent:'center',
        alignItems: 'center',
        marginTop: hp(3)

    },
    orText: {
        fontSize: 20,
        color: '#1B0E5D',
        fontWeight: '700'
    },
    loginButtonContainer: {
        backgroundColor: '#1B0E5D',
        paddingVertical: hp(1),
        paddingHorizontal: wp(11),
        marginHorizontal: wp(8),
        borderRadius: 5,
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: hp(5)
    },
    whiteText: {
        color: '#fff'
    },
    registerTextContainer: {
        marginVertical: hp(1),
        marginHorizontal: wp(8)
    },
    registerNotText: {
        fontSize: 11,
        color: '#6E6E6E'

    },
    registerText: {
        color: '#1B0E5D'
    },



    // modal
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
        // padding: 80,
        width: wp(95),
        paddingVertical: 100,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }


})

