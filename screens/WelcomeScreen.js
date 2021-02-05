import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import db from '../firebaseConfig';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import PasswordAnimation from '../components/PasswordAnimation';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            lastName:'',
            password:'',
            confirmPassword:'',
            emailId:'',
            isButtonPressedAndIsModalVisible:false,
        }
    }

    signingUp = (email, password, confirmPassword) =>{
        if(password !== confirmPassword){
            return (
                Alert.alert('Your password does not match \n Consider changing your password')
            );
        }else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection('users').add({
                    "name":this.state.name,
                    "email_address":this.state.email,
                    "password":this.state.password,
                });
                return (
                    Alert.alert('User added successfully! Go organize your events!',
                                '',
                                [
                                    {text:'Ok!', onPress:()=>this.setState({
                                        isButtonPressedAndIsModalVisible:false,
                                    })}
                                ])
                );
            })
            .catch((error)=>{
                var message = error.message;
                return(
                    Alert.alert(message)
                );
            });
        }
    }
    showModal = () =>{
        return(
        <Modal animationType = "fade" transparent = {true} visible = {this.state.isButtonPressedAndIsModalVisible}>
               <View style = {{
                                flex:1,
                                borderRadius:20,
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:"#ffff",
                                marginRight:30,
                                marginLeft : 30,
                                marginTop:80,
                                marginBottom:80,
                                width:'80%',
                                borderWidth:2,
                                borderRadius:10,
                                height:'90%'
                             }}>
                <ScrollView style = {{width:'100%'}}>
                    <KeyboardAvoidingView style = {{
                                             flex:1,
                                             justifyContent:'center',
                                             alignItems:'center'
                                          }}>
                    <Text style = {{  justifyContent:'center',
                                      alignSelf:'center',
                                      fontSize:30,
                                      color:'#ff5722',
                                      margin:50
                                  }}>
                            Registeration
                    </Text>

                    <View>
                        <TextInput
                        style = {{
                                width:"75%",
                                height:35,
                                alignSelf:'center',
                                borderColor:'#ffab91',
                                borderRadius:10,
                                borderWidth:1,
                                marginTop:20,
                                padding:10
                            }}
                        placeholder = "Name"
                        maxLength = {8}
                        onChangeText = {(text)=>{
                            this.setState({
                                name:text
                            });
                        }}
                        value = {this.state.name}
                        />
                    </View>

                    <View>
                        <TextInput
                        style = {{
                                width:"75%",
                                height:35,
                                alignSelf:'center',
                                borderColor:'#ffab91',
                                borderRadius:10,
                                borderWidth:1,
                                marginTop:20,
                                padding:10
                            }}
                            placeholder = "Email Address"
                            keyboardType = 'email-address'
                            onChangeText = {(text)=>{
                                this.setState({
                                    emailId:text,
                                });
                            }}
                            value = {this.state.emailId}
                        />
                    </View>

                    <View>
                        <TextInput
                        style = {{
                                width:"75%",
                                height:35,
                                alignSelf:'center',
                                borderColor:'#ffab91',
                                borderRadius:10,
                                borderWidth:1,
                                marginTop:20,
                                padding:10
                            }}
                        placeholder = "Type your password here!"
                        keyboardType = 'numeric'
                        secureTextEntry = {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                password:text,
                            });
                        }}
                        />
                    </View>

                    <View>
                        <TextInput
                        style = {{
                                width:"75%",
                                height:35,
                                alignSelf:'center',
                                borderColor:'#ffab91',
                                borderRadius:10,
                                borderWidth:1,
                                marginTop:20,
                                padding:10
                              }}
                        placeholder = "Confirm your password!"
                        keyboardType = 'numeric'
                        secureTextEntry = {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                confirmPassword:text,
                            });
                        }}
                        />
                    </View>

                    <View>
                        <TouchableOpacity onPress = {()=>{this.signingUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                                        style = {{
                                                width:200,
                                                height:40,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                borderWidth:1,
                                                borderRadius:10,
                                                marginTop:30
                                            }}>

                            <Text style = {{   color:'#ff5722',
                                               fontSize:15,
                                               fontWeight:'bold'
                                               }}> Register! </Text>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress = {()=>{this.setState({isButtonPressedAndIsModalVisible:false})}}
                        style = {{
                            width:200,
                            height:40,
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:5,
                            borderWidth:1,
                            borderRadius:10}}
                        >
                                <Text style = {{color:'orange', fontSize:15, fontWeight:'bold'}}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
           </View>
        </Modal>
        );
    }
    signingIn = (emailId, password) =>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            this.props.navigation.navigate('ScheduleScreen');
        })
        .catch((error)=>{
            var message = error.message;
            return(
                Alert.alert(message)
            );
        })
    }
    render(){
        return(
            <View style = {{flex:1, justifyContent:'center', alignItems:'center', background:'#c6f732'}}>
                {
                   (this.state.isButtonPressedAndIsModalVisible)  ?
                   (this.showModal())                             :
                   (console.log('Modal is not visible for some reason.'))
                }
                {/* <View>
                    <PasswordAnimation />
                </View> */}
                <View style = {{marginTop:-200}}>
                    <Text style = {{fontSize:40, fontWeight:'bold', color:'#2e435b'}}> Password Encryptor / Calendar </Text>
                </View>
                <View style = {{marginTop:100}}>
                    <TextInput
                        placeholder = "Email Address"
                        keyboardType = 'email-address'
                        style = {{width:500, height:50, textAlign:'center', borderWidth:2, borderRadius:5, backgroundColor:'white'}}
                        onChangeText = {(text)=>{
                            this.setState({
                                emailId:text,
                            });
                        }}
                        value = {this.state.emailId}
                    />
                </View>

                <View style = {{marginTop:30}}>
                    <TextInput
                        placeholder = "Password"
                        secureTextEntry = {true}
                        style = {{width:400, height:50, textAlign:'center', borderWidth:1, borderRadius:7, backgroundColor:'white'}}
                        onChangeText = {(text)=>{
                            this.setState({
                                password:text
                            });
                        }}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.signingIn(this.state.emailId, this.state.password)}}
                                      style = {{
                                          borderWidth:0.5,
                                          borderRadius:10,
                                          width:150,
                                          height:40,
                                          marginTop:10,
                                          alignItems:'center',
                                          justifyContent:'center',
                                          shadowColor: "#000",
                                          shadowOffset: {
                                             width: 0,
                                             height: 8,
                                          },
                                          shadowOpacity: 0.30,
                                          shadowRadius: 10.32,
                                          elevation: 16,
                                      }}
                    >
                        <Text style = {{color:'#1967d2'}}> Organize! </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.setState({isButtonPressedAndIsModalVisible:true})}}
                                        style = {{
                                            borderWidth:0.5,
                                            borderRadius:10,
                                            width:150,
                                            height:40,
                                            marginTop:10,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                               width: 0,
                                               height: 8,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 10.32,
                                            elevation: 16,
                                        }}>
                        <Text> Sign Up! </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}