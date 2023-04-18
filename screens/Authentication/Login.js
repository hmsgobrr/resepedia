import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { FONTS,SIZES,COLORS,icons,dummyData,constants } from '../../constants';

const Login = () => {

    function renderHeader() {
        return (
            <View style={{
                height:SIZES.height > 700 ? "65%" : "60%"
            }}>
                <ImageBackground>
                    
                </ImageBackground>

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                // alignItems: 'center',
                backgroundColor:COLORS.black
            }}
        >
            <StatusBar barStyle="light-content"/>
            {/* Header */}
            {renderHeader()}

        </View>
    )
}

export default Login;