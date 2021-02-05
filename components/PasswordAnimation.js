import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class PasswordAnimation extends React.Component{
    render(){
        return(
                <LottieView source = {require('../assets/45738-password-process-animation.json')}
                            style = {{width:'50%', height:'50%'}}
                            autoPlay
                            loop
                />

        )
    }
}