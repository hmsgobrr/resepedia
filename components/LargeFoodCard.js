import React from "react";
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Platform,
    StyleSheet
} from 'react-native';

import { SIZES,COLORS,FONTS,icons } from "../constants";

const RecipeCardDetails = ({item})=>{
    return (
        <View style={{
            flex:1
        }}>
            {/* Name and bookmark */}
            <View style={{
                flex:1,
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
                <Text numberOfLines={2}
                style={{
                    width:"70%",
                    color:COLORS.white,
                    ...FONTS.h3
                }}>
                    {item.name}
                </Text>
                <Image
                    source={item.isFavourite ? icons.bookmarkFilled : icons.bookmark}
                    style={{
                        width:20,
                        height:20,
                        marginRight:SIZES.base-6,
                        marginTop:2,
                        tintColor:COLORS.primary
                    }}
                />

            </View>
            {/* Description */}
            <Text numberOfLines={1}
            style={{marginTop:SIZES.radius,
                color:COLORS.lightGray,
                ...FONTS.body5}}>
                {item.description}
            </Text>

            {/* Servings */}
            <Text style={{color:COLORS.lightGray1, ...FONTS.h4}}>
                {item.duration} | {item.serving} Serving
            </Text>

        </View>
    )
}

const RecipeCardInfo = ({item})=>{
    return (
        <View
        style={{
            position:'absolute',
            bottom:10,
            left:10,
            right:10,
            height:100,
            paddingHorizontal:SIZES.radius,
            paddingVertical:SIZES.base,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.transparentBlack7
        }}>
            <RecipeCardDetails item={item}/>
    
        </View>     
    )

}

const LargeFoodCard = ({containerStyle,item,onPress,})=>{
    return (
        <TouchableOpacity
            style={{
                height:350,
                width:250,
                marginTop:SIZES.radius,
                marginRight:20,
                borderRadius:SIZES.radius,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* BG Image */}
            <Image
                source={item.image}
                resizeMode="cover"
                style={{
                    width:250,
                    height:350,
                    borderRadius:SIZES.radius
                }}
            />
            {/* Category */}
            <View
            style={{
                position:'absolute',
                flexDirection:'row',
                top:20,
                left:15,
                paddingHorizontal:SIZES.radius,
                paddingVertical:5,
                backgroundColor: COLORS.transparentGray,
                borderRadius:SIZES.radius
            }}>
                <Image
                source={icons.star}
                style={{
                    width:12,
                    height:12,
                    marginHorizontal:3,
                    bottom:-3,
                    tintColor:COLORS.orange
                }}/>
                <Text style={{color:COLORS.white,...FONTS.h4}}>
                    {item.rating}
                </Text>

            </View>
            {/* Info */}
            <RecipeCardInfo item={item}/>
        </TouchableOpacity>
    )
}

export default LargeFoodCard;