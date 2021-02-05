// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Base64 } from 'js-base64';
import db from '../firebaseConfig';
import firebase from 'firebase';

export default class PasswordEncryptor extends React.Component {
constructor(){
    super();
    this.state = {
        password:'',
        encryptedPassword:'',
        decryptedPassword:'',
        application:'',
        userEmailId:firebase.auth().currentUser.email,
    }
}
   encryptPassword = () =>{
        var encryptedPassword = Base64.encode(this.state.password);
        this.setState({
            "encryptedPassword":encryptedPassword,
        }, ()=>{
            this.sendEncryptedPasswordToFirebase();
            console.log(this.state.encryptedPassword);
        })

    }
    sendEncryptedPasswordToFirebase = () =>{

        // if(db.collection('encrypted_password').where('user_id', '==', userEmailId) && ){

        // }
        db.collection('encrypted_passwords').add({
            "application_name":this.state.application,
            "password":this.state.encryptedPassword,
            "email_id":this.state.userEmailId,
        }).then(()=>{
            return(
                Alert.alert('Your password has been encrypted and saved successfully')
            );
        }).catch((error)=>{
            var message = error.message;
            return(
                Alert.alert(message)
            );
        })
    }
    decryptPassword(){
      var decryptedPassword = Base64.decode(this.state.encryptedPassword);
        this.setState({
            "decryptedPassword":decryptedPassword,
        }).then(()=>{
            console.log(this.state.decryptedPassword);
        })
    }
  render() {
    return (
        // <SafeAreaProvider>
      <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text> Password Encryptor </Text>

       <TextInput
          onChangeText = {(text)=>{
              this.setState({
                  "application":text,
              });
          }}
          value = {this.state.application}
          placeholder = {"Enter the application"}
        />

        <TextInput
            onChangeText = {(text)=>{
            this.setState({
                "password":text,
            });
            }}
        value = {this.state.password}
        placeholder = {"Password"}
        />

        <TouchableOpacity onPress = {()=>{
            this.encryptPassword();
            this.sendEncryptedPasswordToFirebase()
            }}>
            <Text> Click </Text>
        </TouchableOpacity>

        <Text> {this.state.encryptedPassword} </Text>
      </View>
    );
  }
}


