import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { FONTS,SIZES,COLORS,icons,dummyData,constants } from '../../constants';
import { HorizontalFoodCard, LargeFoodCard, VerticalFoodCard } from '../../components';
import { useSharedValue, useAnimatedStyle, useDerivedValue, withTiming, interpolateColor } from 'react-native-reanimated';
import { onChange } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { useNavigation } from '@react-navigation/native';

const Search = () => {

    const navigation = useNavigation();
    const [selectedCategoryId, setSelectedCategoryId]=React.useState(1)
    const [selectedMenuType, setSelectedMenuType]=React.useState(1)
    const [popularSearch,setPopularSearch] = React.useState([])
    const [menuList,setMenuList] = React.useState([])

    React.useEffect(()=>{
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    },[])

    function handleChangeCategory(categoryId, menuTypeId) {
        // Retrieve popular menu
        let selectedPopularSearch = dummyData.menu.find(a=>a.name=="Popular Searches")
        //Find Menu based on ID
        let selectedMenu = dummyData.menu.find(a=>a.id==menuTypeId)
        // Set the popular menu based on categoryId
        setPopularSearch(selectedPopularSearch?.list.filter(a=>a.categories.includes(categoryId)))
        // Set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a=>a.categories.includes(categoryId)))
    }
    
    const [isVisible, setIsVisible] = React.useState(false);
    const [isExpand, setIsExpand] = React.useState(false);

    const searchAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const expandAnimatedValue = React.useRef(new Animated.Value(0)).current;

    const [setShowSearch, setShowSearchModal] = React.useState(isVisible)

    const [largeSearch, setLargeSearch] = React.useState(isExpand)

    React.useEffect(() => {
        if(setShowSearch) {
            Animated.spring(searchAnimatedValue, {
                toValue:1,
                duration:500,
                useNativeDriver:false
            }).start();
        } else {
            Animated.timing(searchAnimatedValue, {
                toValue:0,
                duration:500,
                useNativeDriver:false
            }).start();            
        }
        
    },[setShowSearch])

    React.useEffect(() => {
        if(largeSearch) {
            Animated.timing(expandAnimatedValue, {
                toValue:1,
                duration:400,
                useNativeDriver:false
            }).start();
        } else {
            Animated.timing(expandAnimatedValue, {
                toValue:0,
                duration:400,
                useNativeDriver:false
            }).start();            
        }
        
    },[largeSearch])

    const searchY = searchAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[SIZES.height-900,SIZES.height-816]
    })

    const marginY = searchAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-80,-40]
    })

    const widthY = expandAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[280,327]
    })

    function renderSearch() {

        return (
            <View style={{flexDirection:'row'}}>
                <Animated.View  
                style={{
                    flexDirection:'row',
                    height:40,
                    alignItems:'center',
                    marginHorizontal:SIZES.padding,
                    width:widthY,
                    marginVertical:SIZES.base,
                    paddingHorizontal:SIZES.radius,
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.lightGray2
                }}>
                    {/* Icon */}
                    <Image
                        source={icons.search}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.black
                        }}
                    />
                    {/* Text Input */}
                    <TextInput
                        style={{
                            flex:1,
                            marginLeft:SIZES.radius,
                            ...FONTS.body3
                        }}
                        placeholder='Type in ingreidients'
                        // editable={false}
                        onFocus={()=>{setLargeSearch(true)}}
                        onBlur={()=>{setLargeSearch(false)}}
                       />
                    
                    {/* Filter */}
                    <TouchableOpacity>
                        <Animated.Image
                        source={icons.filter}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.black,
                            opacity: widthY.interpolate({
                                inputRange:[280,327],
                                outputRange:[0,1]
                            })
                        }}
                    
                        />
                    </TouchableOpacity>

                {/* Drop down */}
                </Animated.View>
                <TouchableOpacity                 style={{
                    flexDirection:'row',
                    height:40,
                    alignItems:'center',
                    right:expandAnimatedValue.interpolate({
                        inputRange:[0,1],
                        outputRange:[15,30]
                    }),
                    marginVertical:SIZES.base,
                    paddingHorizontal:SIZES.radius,
                }}
                onPress={()=>{setShowSearchModal(!setShowSearch)}}
                >
                        <Animated.Image
                        source={icons.down_arrow}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.black,
                            opacity: widthY.interpolate({
                                inputRange:[280,320],
                                outputRange:[1,0]
                            }),
                            transform:[
                                {
                                    rotate:searchAnimatedValue.interpolate({
                                        inputRange:[0,1],
                                        outputRange:['90deg','0deg']
                                    })
                            }
                            ]
                            
                        }}/>
                    </TouchableOpacity>  

            </View>


        )
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* Search */}
            {renderSearch()}

            {/* Second search */}
            <Animated.View
            style={{
                flexDirection:'row',
                height:40,
                alignItems:'center',
                top: searchY,
                
                marginHorizontal:SIZES.padding,
                marginVertical:SIZES.base,
                paddingHorizontal:SIZES.radius,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2,
                opacity: searchY.interpolate({
                    inputRange:[SIZES.height-870,SIZES.height-816],
                    outputRange:[0,1]
                })
            }}>
                    {/* Icon */}
                    <Animated.Image
                        source={icons.search}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.black,
                        }}
                    />
                    {/* Text Input */}
                    <TextInput
                        style={{
                            flex:1,
                            marginLeft:SIZES.radius,
                            ...FONTS.body3
                        }}
                        placeholder='Exclude ingredients'
                        // editable={false}
                        // onTouchStart={()=>setSelectedTab(constants.screens.search)}
                       />
                    
                    {/* Filter */}
                    <TouchableOpacity>
                        <Image
                        source={icons.filter}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.black,
                            
                        }}/>
                    </TouchableOpacity>
            </Animated.View>

            {/* Recent Search */}
            <Animated.View
            style={{
                flex:1,
                top:marginY,
                marginVertical:SIZES.padding
                }}>
            <View
                style={{
                    flexDirection:'row',
                    marginHorizontal:SIZES.padding,
                    marginTop:30,
                    marginBottom:20
                }}
                >
                    <Text style={{flex:1,...FONTS.h3}}>
                        Popular Searches
                    </Text>
            </View>
            
            <FlatList
                data={popularSearch}
                keyExtractor={(item)=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height:115,
                                alignItems:'center',
                                marginHorizontal:SIZES.padding,
                                marginBottom:SIZES.radius,
                            }}    
                            imageStyle={{
                                height:100,
                                width:100,
                                borderRadius:SIZES.radius,
                                alignItems:'center',
                                marginHorizontal:10
                            }}
                            item={item}
                            onPress={()=>navigation.navigate("Recipe",{recipe:item})}
                        />
                    )
                }}
                ListFooterComponent={<View style={{height:210}}/>}
            />
            </Animated.View>

        </View>
    )
}

export default Search