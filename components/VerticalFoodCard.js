import React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { COLORS,FONTS,SIZES,icons } from "../constants";

const VerticalFoodCard = ({containerStyle,item,onPress}) => {
    return (
        <TouchableOpacity
            style={{
                width:200,
                padding:SIZES.radius,
                alignItems:'center',
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Rating and Bookmark */}
            <View style={{flexDirection:'row'}}>
                {/* Rating */}
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image
                    source={icons.star}
                    style={{
                        width:15,
                        height:15,
                        bottom:-3,
                        marginRight:1,
                        tintColor:COLORS.orange
                    }}/>
                    <Text style={{color:COLORS.darkGray2,...FONTS.body5,left:3}}>
                        {item.rating}
                    </Text>
                </View>
                {/* Bookmark */}
                <Image
                    source={icons.bookmarkFilled}
                    style={{
                        width:20,
                        height:20,
                        tintColor:item.isFavourite ? COLORS.primary : COLORS.gray
                    }}
                />
            </View>

            {/* Image */}
            <View
                style={{
                    marginTop:5,
                    height:150,
                    width:150,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Image
                source={item.image}
                resizeMode="cover"
                style={{
                    height:"100%",
                    width:"100%",
                    borderRadius:20
                }}/>

            </View>

            {/* Info */}
            <View
            style={{alignItems:'center',marginTop:10}}>
                <Text style={{...FONTS.h3}}>{item.name}</Text>
                <Text style={{color:COLORS.darkGray2, textAlign:'center',...FONTS.body5}} numberOfLines={1}>{item.description}</Text>
                <Text style={{marginTop:SIZES.radius-3,...FONTS.h4}}>{item.duration} | {item.serving} Serving</Text>
            </View>

        </TouchableOpacity>
    )
}

export default VerticalFoodCard;