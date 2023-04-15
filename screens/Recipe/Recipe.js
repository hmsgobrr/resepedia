import React, {useRef} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    Platform
} from 'react-native';

import { FONTS,SIZES,COLORS,icons,dummyData,constants } from '../../constants';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HEADER_HEIGHT = 350;

const RecipeCreatorCardDetail = ({selectedRecipe}) => {
    return (
        <View
        style={{
            flex:1,
            flexDirection:'row',
            alignItems:'center'
        }}
        >
            {/* Profile */}
            <View
            style={{
                width:40,
                height:40,
                marginLeft:20
            }}>
                <Image source={selectedRecipe?.author?.profilePic}
                style={{
                    width:40,
                    height:40,
                    borderRadius:20}}/>
            </View>

            <View
            style={{
                flex:1,
                marginHorizontal:20
            }}>
                <Text style={{color:COLORS.lightGray2,...FONTS.body4}}>Recipe by :</Text>
                <Text numberOfLines={2}
                style={{color:COLORS.white2,...FONTS.h3}}>{selectedRecipe?.author?.name}</Text>
            </View>
            <TouchableOpacity
            style={{
                width:30,
                height:30,
                alignItems:'center',
                justifyContent:'center',
                marginRight:20,
                borderRadius:9,
                borderWidth:2,
                borderColor:COLORS.green
            }}
            onPress={()=>console.log("Profile opened")}>
                <Image
                    source={icons.rightArrow}
                    style={{
                        width:13,
                        height:13,
                        tintColor:COLORS.green
                    }}
                />

            </TouchableOpacity>

        </View>
    )
}

const RecipeCreatorCardInfo = ({selectedRecipe}) => {
    return (
        <View
        style={{flex:1,borderRadius:SIZES.radius,backgroundColor:COLORS.transparentBlack7}}>
            <RecipeCreatorCardDetail selectedRecipe={selectedRecipe}/>
        </View>
    )
}

const Recipe = ({navigation, route}) => {

    const [selectedRecipe, setSelectedRecipe] = React.useState(null)

    const scrollY = useRef(new Animated.Value(0)).current;

    const separator = () => {
        return(
            <View
                    style={{
                        height:1,
                        marginVertical:SIZES.radius,
                        marginLeft:SIZES.radius,
                        backgroundColor:COLORS.lightGray1
                    }}/>
        )
    }

    React.useEffect(()=>{
        let {recipe} = route.params
        setSelectedRecipe(recipe)
    },[])

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    function renderHeaderBar() {
        return (
        <View
            style={{
                position:'absolute',
                top:10,
                left:0,
                right:0,
                height:90,
                flexDirection:'row',
                alignItems:'flex-end',
                justifyContent:'space-between',
                paddingHorizontal:SIZES.padding,
                paddingBottom:10
            }}
            >

                {/* Gradient */}
                <LinearGradient
                start={{x:0, y:0}}
                end={{x:0,y:2}}
                colors={[
                    COLORS.black,
                    'transparent',
                    'transparent'
                    
                ]}
                style={{
                    position:'absolute',
                    left:0,
                    right:0,
                    height:150,
                    top:-30,
                    borderTopRightRadius:15,
                    borderTopLeftRadius:15
                }}
                />

                {/* Screen Overlay */}
                <Animated.View
                    style={{
                        position:'absolute',
                        top:-50,
                        left:0,
                        right:0,
                        bottom:0,
                        
                        backgroundColor:COLORS.white,
                        opacity: scrollY.interpolate({
                            inputRange:[HEADER_HEIGHT-100,HEADER_HEIGHT-70],
                            outputRange:[0,1]
                        })
                    }}
                />

                {/* Header Title */}
                <Animated.View
                style={{
                    position:'absolute',
                    top:0,
                    marginBottom:2,
                    left:0,
                    right:0,
                    bottom:0,
                    alignItems:'center',
                    justifyContent:'flex-end',
                    paddingBottom:10,
                    opacity:scrollY.interpolate({
                        inputRange:[HEADER_HEIGHT-100,HEADER_HEIGHT-50],
                        outputRange:[0,1]
                    }),
                    transform:[
                        {
                            translateY:scrollY.interpolate({
                                inputRange:[HEADER_HEIGHT-100,HEADER_HEIGHT-50],
                                outputRange:[50,0],
                                extrapolate:'clamp'
                            })
                        }
                    ]
                }}>
                    <Text style={{color:COLORS.gray2,...FONTS.body5}}>{selectedRecipe?.author?.name}</Text>
                    <Text style={{...FONTS.h3, color:COLORS.black}}>{selectedRecipe?.name.toUpperCase()}</Text>
                </Animated.View>

                {/* Back */}
                <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:40,
                    width:40,
                    borderWidth:1,
                    borderRadius:SIZES.radius,
                    borderColor:COLORS.gray2,
                }}
                >
                
                    <Image source={icons.back} style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.gray2
                    }}/>
                </TouchableOpacity>


                {/* Bookmark */}
                <TouchableOpacity style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:40,
                    width:40,
                }}>
                    <Image
                    source={selectedRecipe?.isFavourite ? icons.bookmarkFilled : icons.bookmark}
                    style={{
                        width:35,
                        height:35,
                        tintColor:COLORS.primary
                    }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    
    function renderRecipeCardHeader() {
        return(
            <View
            style={{
                alignItems:'center',
                overflow:'hidden',
                paddingTop:1000,
                marginTop:-1000,
            }}>
                {/* BG */}
                <Animated.Image 
                    source={selectedRecipe?.image}
                    resizeMode="contain"
                    style={{
                        height:HEADER_HEIGHT,
                        marginBottom:15,
                        width:"200%",
                        transform:[
                            {
                                translateY:scrollY.interpolate({
                                    inputRange:[-HEADER_HEIGHT,0,HEADER_HEIGHT],
                                    outputRange:[-HEADER_HEIGHT/2,0,HEADER_HEIGHT*0.75]
                                })
                            },
                            {
                                scale:scrollY.interpolate({
                                    inputRange:[-HEADER_HEIGHT,0,HEADER_HEIGHT],
                                    outputRange:[2,1,0.75]
                                })
                            }
                        ]
                    }}
                />
                {/* Recipe Creator */}
                <Animated.View
                style={{
                    position:"absolute",
                    bottom:10,
                    left:30,
                    right:30,
                    height:80,
                    marginBottom:10,
                    transform:[
                        {
                            translateY:scrollY.interpolate({
                                inputRange:[0,170,250],
                                outputRange:[0,0,100],
                                extrapolate:'clamp'
                            })
                        }
                    ]
                }}>
                    <RecipeCreatorCardInfo selectedRecipe={selectedRecipe}/>
                </Animated.View>

            </View>
        )
    }

    function renderRecipeInfo() {
        return (
            <View
            style={{
                marginTop:SIZES.padding-5,
                flex:1,
                marginBottom:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}
            >
                {/* Name & Desc */}
                <Text
                style={{...FONTS.h1}}
                >
                    {selectedRecipe?.name}
                </Text>

                <Text
                style={{marginTop:SIZES.base,
                    color:COLORS.darkGray,
                    textAlign:'justify',
                    ...FONTS.body3}}
                >
                    {selectedRecipe?.description}
                </Text>
                
                {/* Rating and duration */}

                <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.padding
                }}
                >
                    {/* Rating */}
                    <View 
                    style={{
                        paddingHorizontal:SIZES.radius,
                        flexDirection:'row',
                        paddingVertical:SIZES.base,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    >
                        <Image source={icons.star} style={{
                            width:20,
                            height:20,

                        }}/>

                        <Text style={{color:COLORS.white, marginLeft:SIZES.base,...FONTS.body3}}>
                            {selectedRecipe?.rating}
                        </Text>
                    </View>

                    {/* Duration */}
                    <View 
                    style={{
                        paddingHorizontal:0,
                        flexDirection:'row',
                        paddingVertical:SIZES.base,
                        borderRadius:SIZES.radius,
                        marginLeft:SIZES.radius,
                    }}
                    >
                        <Image source={icons.clock} style={{
                            width:20,
                            height:20,
                            tintColor:COLORS.black

                        }}/>

                        <Text style={{color:COLORS.black, marginLeft:SIZES.base,...FONTS.body3}}>
                            {selectedRecipe?.duration}
                        </Text>
                    </View>

                    {/* Views */}
                    <View 
                    style={{
                        paddingHorizontal:0,
                        flexDirection:'row',
                        paddingVertical:SIZES.base,
                        borderRadius:SIZES.radius,
                        marginLeft:SIZES.radius,
                    }}
                    >
                        <Image source={icons.view} style={{
                            width:20,
                            height:20,
                            tintColor:COLORS.black

                        }}/>

                        <Text style={{color:COLORS.black, marginLeft:SIZES.base,...FONTS.body3}}>
                            {kFormatter(selectedRecipe?.views)} Views
                        </Text>
                    </View>


                </View>
            </View>
        )
    }

    function renderIngredientHeader() {
        return (
            <View
            style={{
                flexDirection:'row',
                paddingHorizontal:30,
                marginTop:SIZES.radius,
                marginBottom:SIZES.padding
            }}
            >
                <Text style={{flex:1,...FONTS.h3}}>Ingredients</Text>
                <Text style={{color:COLORS.gray,...FONTS.body4}}>{selectedRecipe?.ingredients.length} items</Text>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor:COLORS.white
            }}
        >
            <Animated.FlatList
                data={selectedRecipe?.ingredients}
                keyExtractor={item=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderRecipeCardHeader()}

                        {/* Info */}
                        {renderRecipeInfo()}

                        {/* Ingredient Title */}
                        {renderIngredientHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y:scrollY } } }],
                    { useNativeDriver: true }
                )}
                // ItemSeparatorComponent={separator}
                renderItem={({item,index})=>(
                    <View style={{
                        flexDirection:'row',
                        paddingHorizontal:30,
                        marginVertical:5
                    }}>
                        <View style={{
                            alignItems:'center',
                            justifyContent:'center',
                            height:50,
                            width:50,
                            borderRadius:5,
                            backgroundColor:COLORS.lightGray
                        }}>
                            <Text style={{...FONTS.h3}}>
                            {index+1}
                            </Text>
                        </View>

                        {/* Description */}
                        <View
                            style={{
                                flex:1,
                                paddingHorizontal:20,
                                justifyContent:'center'
                            }}
                        >
                            <Text
                            style={{...FONTS.body3}}>
                                {item.description}
                            </Text>

                        </View>

                        {/* Quantity */}
                        <View
                            style={{
                                alignItems:'flex-end',
                                justifyContent:'center'
                            }}
                        >
                            <Text
                            style={{...FONTS.h3}}>
                                {item.quantity}
                            </Text>


                        </View>
                        
                    </View>
                    
                )}
                ListFooterComponent={
                    <View style={{marginBottom:200}}/>
                }
            />

            {/* Header Bar */}
            {renderHeaderBar()}
        
        </View>
    )
}

export default Recipe;