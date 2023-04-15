import React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { COLORS,FONTS,SIZES,icons } from "../constants";

const HorizontalFoodCard = ({containerStyle,imageStyle,item,onPress}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:'row',
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Image */}
            <Image
                resizeMode="cover"
                source={item.image}
                style={imageStyle}
            />
            {/* Info */}
            <View
            style={{flex:1}}
            >
                {/* Name */}
                <Text style={{...FONTS.h3,fontSize:17}}>
                    {item.name}
                </Text>
                {/* Description */}
                <Text numberOfLines={1} style={{color:COLORS.darkGray2,...FONTS.body4}}>
                    {item.description}
                </Text>
                {/* Servings */}
                <Text style={{marginTop:SIZES.base, ...FONTS.h5}}>
                    {item.duration} | {item.serving} Serving
                </Text>
            </View>

            {/* Ratings */}
            <View
            style={{
                flexDirection:'row',
                position:'absolute',
                top:5,
                right:SIZES.radius
            }}>
                <Image
                source={icons.star}
                style={{
                    width:15,
                    height:15,
                    bottom:-3,
                    marginHorizontal:1,
                    tintColor:COLORS.orange
                }}/>
                <Text style={{color:COLORS.darkGray2,...FONTS.body5,left:3}}>
                    {item.rating}
                </Text>

            </View>

        </TouchableOpacity>
    )
}

export default HorizontalFoodCard;