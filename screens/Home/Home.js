import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { FONTS,SIZES,COLORS,icons,dummyData,constants } from '../../constants';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../stores/tab/tabActions';
import { HorizontalFoodCard, LargeFoodCard, VerticalFoodCard } from '../../components';
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, withTiming, interpolateColor } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Section = ({title,onPress,children}) => {
    return (
        <View>
            {/* Header */}
                <View
                style={{
                    flexDirection:'row',
                    marginHorizontal:SIZES.padding,
                    marginTop:30,
                    marginBottom:20
                }}
                >
                    <Text style={{flex:1,...FONTS.h3}}>
                        {title}
                    </Text>

                    <TouchableOpacity onPress={onPress}>
                        <Text style={{color:COLORS.primary,...FONTS.body3}}>
                            Show All
                        </Text>
                    </TouchableOpacity>

                </View>
            {/* Content */}
            {children}

        </View>
    )
}

const Home = ({setSelectedTab}) => {
    const navigation = useNavigation();
    const [selectedCategoryId, setSelectedCategoryId]=React.useState(1)
    const [selectedMenuType, setSelectedMenuType]=React.useState(1)
    const [recommends, setRecommends] = React.useState([])
    const [popular,setPopular] = React.useState([])
    const [menuList,setMenuList] = React.useState([])

    React.useEffect(()=>{
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    },[])

    function handleChangeCategory(categoryId, menuTypeId) {
        // Retrieve popular menu
        let selectedPopular = dummyData.menu.find(a=>a.name=="Popular")
        // Retrieve recommended menu
        let selectedRecommend = dummyData.menu.find(a=>a.name=="Recommended")
        //Find Menu based on ID
        let selectedMenu = dummyData.menu.find(a=>a.id==menuTypeId)
        // Set the popular menu based on categoryId
        setPopular(selectedPopular?.list.filter(a=>a.categories.includes(categoryId)))
        // Set the recommended menu based on categoryId
        setRecommends(selectedRecommend?.list.filter(a=>a.categories.includes(categoryId)))
        // Set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a=>a.categories.includes(categoryId)))
    }

    function renderSearch() {
        return (
                <View  
                style={{
                    flexDirection:'row',
                    height:40,
                    alignItems:'center',
                    marginHorizontal:SIZES.padding,
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
                        placeholder='search for recipes'
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

                </View>

        )
    }

    function renderMenuTypes(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    horizontal
                    data={dummyData.menu}
                    keyExtractor={item=>`${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    // snapToInterval={SIZES.padding}
                    contentContainerStyle={{
                        marginTop:30,
                        marginBottom:20
                    }}
                    renderItem={({item,index})=>(
                        <TouchableOpacity
                        style={{
                            marginLeft:SIZES.padding,
                            marginRight:index==dummyData.menu.length-1 ? SIZES.padding:0,
                        }}
                        onPress={()=>{
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId,item.id)
                        }}
                        >
                            <Text
                            style={{
                                //textDecorationLine:selectedMenuType==item.id? 'underline' : 'none',
                                color:selectedMenuType==item.id? COLORS.primary : COLORS.darkGray,
                                ...FONTS.h3,
                                //fontStyle:selectedMenuType==item.id?'italic' : 'normal',
                                
                                //fontFamily: selectedMenuType==item.id? fontFamily: "Poppins-Bold" : fontFamily: "Poppins-SemiBold"
                                
                                // fontSize : selectedMenuType==item.id? 19 : SIZES.h3,
                                // bottom:selectedMenuType==item.id? -1 : 0
                            }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    function renderRecommendedSection() {
        return (
            <Section
            title="Recommended"
            onPress={()=>console.log("Show all recommended")}>
                <FlatList
                    data={recommends}
                    keyExtractor={item=>`${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <LargeFoodCard 
                            containerStyle={{
                                marginLeft:index==0?SIZES.padding : 18,
                                marginRight:index==recommends.length-1?SIZES.padding:0,
                            }}  
                            onPress={()=>navigation.navigate("Recipe",{recipe:item})}
                            item={item}/>
                        )
                    }}

                />

            </Section>
        )
    }

    function renderPopularSection() {
        return (
            <Section
            title="Popular"
            onPress={()=>console.log("Show all Popular")}>
                <FlatList
                    data={popular}
                    keyExtractor={item=>`${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index})=>(
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft:index==0 ? SIZES.padding:18,
                                marginRight:index==popular.length-1?SIZES.padding:0,
                            }}  
                            item={item}
                            onPress={()=>navigation.navigate("Recipe",{recipe:item})}
                        />
                    )}
                />
            </Section>
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

            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={(item)=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Popular */}
                        {renderPopularSection()}

                        {/* Recommended */}
                        {renderRecommendedSection()}

                        {/* Menu Type */}
                        {renderMenuTypes()}

                    </View>
                }
                renderItem={({item,index})=>{
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height:130,
                                alignItems:'center',
                                marginHorizontal:SIZES.padding,
                                marginBottom:SIZES.radius,
                            }}    
                            imageStyle={{
                                height:115,
                                width:115,
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

        </View>
    )
}

function mapStateToProps(state) {
return {
    selectedTab : state.tabReducer.selectedTab
}
}

function mapDispatchToProps(dispatch) {
return {
    setSelectedTab: (selectedTab) => { return dispatch(setSelectedTab(selectedTab))}
}
}

export default connect(mapStateToProps, mapDispatchToProps)
(Home)