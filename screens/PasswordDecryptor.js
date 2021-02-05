import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../firebaseConfig';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { Base64 } from 'js-base64';

export default class PasswordDecryptor extends React.Component{
    constructor(){
        super();
        this.state = {
            savedPassword:[

            ],
            emailId:firebase.auth().currentUser.email,
            lastVisiblePassword:'',
        }
    }
    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, i}) =>{
        return(
            <ListItem key = {i}
                      bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title>
                        {item.application_name}
                    </ListItem.Title>

                    <ListItem.Subtitle>
                        {item.decryptedPassword}
                    </ListItem.Subtitle>
                </ListItem.Content>

            </ListItem>
    );
}
   fetchMorePasswords = async() =>{
        db.collection("encrypted_passwords")
        .where("email_id", "==", this.state.emailId)
        .startAfter(this.state.lastVisiblePassword)
        .orderBy(this.state.lastVisiblePassword.docId)
        .limit(10)
        .get()
        .docs.map((doc)=>{
            this.setState({
                savedPassword:[...this.state.savedPassword, doc.data()],
                lastVisiblePassword:doc,
            });
        });
    }
    getAllEncryptedPasswords = () =>{
        var currentUser = firebase.auth().currentUser.email;
        console.log("user email ", currentUser)
        db.collection("encrypted_passwords").where("email_id", "==", currentUser)
        .limit(10)
        .get()
        .then((snapshot)=>{
            var passwords = [];
            snapshot.forEach((doc)=>{
                var data = doc.data();
                var encryptedPassword = data.password;
                var decryptedPassword = Base64.decode(encryptedPassword);
                console.log(decryptedPassword);
                data["decryptedPassword"] = decryptedPassword;
                data["docId"] = doc.id;
                passwords.push(data);
                this.setState({
                    lastVisiblePassword:data,
                })
            });
            this.setState({
                  savedPassword:passwords,
            });
            console.log(this.state.savedPassword);
        });
    }
    componentDidMount(){
        this.getAllEncryptedPasswords();
    }
    render(){
        return(
            <View>
                    {this.state.savedPassword.length === 0 ? (
                        <View style = {{justifyContent:'center', alignItems:'center', flex:1}}>
                            <Text style = {{fontWeight:'bold', fontSize:20}}> There are no passwords saved </Text>
                            <Text> {this.state.savedPassword} </Text>
                        </View>
                    )   :
                    (
                        <View>
                          <FlatList keyExtractor = {this.keyExtractor}
                                    data = {this.state.savedPassword}
                                    renderItem = {this.renderItem}
                                    onEndReached = {this.fetchMorePasswords}
                                    onEndReachedThreshold = {0.7}
                          />
                        </View>
                    )
                    }
            </View>
        );
    }

}