import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useDrawerProgress,useIsDrawerOpen } from '@react-navigation/drawer';

import { Home, Search, Bookmark, Notification} from "../screens";

import { COLORS,FONTS,SIZES,icons,constants,dummyData } from '../constants'
import { Header } from '../components';

import { LinearGradient } from 'expo-linear-gradient';

const TabButton = ({label, icon, isFocused, onPress, outerContainerStyle, innerContainerStyle}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
      style={[{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }, outerContainerStyle]}
      >
        <Animated.View
        style={[{
          flexDirection:'row',
          width:"80%",
          height:50,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:25
        },innerContainerStyle]}
        >
          <Image
          source={icon}
          style={{
            width:18,
            height:18,
            tintColor: isFocused ? COLORS.white : COLORS.gray
          }}/>

          {isFocused && 
            <Text
              numberOfLines={1}
              style={{marginLeft:SIZES.base,
                      color: isFocused ? COLORS.white : COLORS.gray,
                      ...FONTS.h3
                    }}
            >
              {label}
            </Text>
            }

        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const MainLayout = ({props, navigation, selectedTab, setSelectedTab}) => {
  const progress = useDrawerProgress();

  const flatListRef=React.useRef();

  // Reanimated Shared Value

  const homeTabFlex=useSharedValue(1)
  const homeTabColor = useSharedValue(COLORS.white)
  const searchTabFlex=useSharedValue(1)
  const searchTabColor = useSharedValue(COLORS.white)
  const bookmarkTabFlex=useSharedValue(1)
  const bookmarkTabColor = useSharedValue(COLORS.white)
  const notificationTabFlex=useSharedValue(1)
  const notificationTabColor = useSharedValue(COLORS.white)

  // Reanimated Animation style

  const homeFlexStyle = useAnimatedStyle(()=>{
    return {
      flex:homeTabFlex.value
    }
  })

  const homeColorStyle = useAnimatedStyle(()=>{
    return {
      backgroundColor:homeTabColor.value
    }
  })
  
  const searchFlexStyle = useAnimatedStyle(()=>{
    return {
      flex:searchTabFlex.value
    }
  })

  const searchColorStyle = useAnimatedStyle(()=>{
    return {
      backgroundColor:searchTabColor.value
    }
  })

  const bookmarkFlexStyle = useAnimatedStyle(()=>{
    return {
      flex:bookmarkTabFlex.value
    }
  })

  const bookmarkColorStyle = useAnimatedStyle(()=>{
    return {
      backgroundColor:bookmarkTabColor.value
    }
  })

  const notificationFlexStyle = useAnimatedStyle(()=>{
    return {
      flex:notificationTabFlex.value
    }
  })

  const notificationColorStyle = useAnimatedStyle(()=>{
    return {
      backgroundColor:notificationTabColor.value
    }
  })

  React.useEffect(()=>{
    setSelectedTab(constants.screens.home)
  }, [])

  React.useEffect(()=> {
    if(selectedTab==constants.screens.home){
      flatListRef?.current?.scrollToIndex({
        index:0,
        animated:false
      })
      homeTabFlex.value=withSpring(4)
      homeTabColor.value=withTiming(COLORS.primary, {duration:450})
    } else {
      homeTabFlex.value=withSpring(1,)
      homeTabColor.value=withTiming(COLORS.white, {duration:450})
    }

    if(selectedTab==constants.screens.search){
      flatListRef?.current?.scrollToIndex({
        index:1,
        animated:false
      })
      searchTabFlex.value=withSpring(4,)
      searchTabColor.value=withTiming(COLORS.primary, {duration:450})
    } else {
      searchTabFlex.value=withSpring(1,)
      searchTabColor.value=withTiming(COLORS.white, {duration:450})
    }

    if(selectedTab==constants.screens.bookmark){
      flatListRef?.current?.scrollToIndex({
        index:2,
        animated:false
      })
      bookmarkTabFlex.value=withSpring(4,)
      bookmarkTabColor.value=withTiming(COLORS.primary, {duration:450})
    } else {
      bookmarkTabFlex.value=withSpring(1,)
      bookmarkTabColor.value=withTiming(COLORS.white, {duration:450})
    }

    if(selectedTab==constants.screens.notification){
      flatListRef?.current?.scrollToIndex({
        index:3,
        animated:false
      })
      notificationTabFlex.value=withSpring(4,)
      notificationTabColor.value=withTiming(COLORS.primary, {duration:450})
    } else {
      notificationTabFlex.value=withSpring(1,)
      notificationTabColor.value=withTiming(COLORS.white, {duration:450})
    }
  },[selectedTab])

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 28],
  });

  const rotateY = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: ["0deg", '-30deg']
  });

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: ['0','-125  ']
  });


  const animatedStyle = {
    borderRadius,
    transform: [
      { perspective:850},
      { scale },
      { rotateY },
      { translateX }
    ],
    overflow:'hidden'
  };

  return (
    <View style={{flex:1}}>

      <Animated.View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          ...animatedStyle
        }}
      >
        {/* Header */}
        <Header containerStyle={{
          height:50,
          paddingHorizontal:SIZES.padding,
          marginTop:40,
          alignItems:'center'
        }}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
          style={{
            width:40,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:SIZES.radius,
            borderWidth:1,
            borderColor:COLORS.gray2
          }}
          onPress={()=>navigation.openDrawer()}>
            <Image source={icons.menu}/>
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
          style={{
            borderRadius:SIZES.radius,
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Image
              source={dummyData?.myProfile?.profile_image}
              style={{
                width:40,
                height:40,
                borderRadius:SIZES.radius
              }}
            />
          </TouchableOpacity>
        }
        />

        {/* Content */}
        <View
        style={{
          flex:1
        }}
        >
          <FlatList 
            ref={flatListRef}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            snapToAlignment='center'
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            data={constants.bottom_tabs}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item,index})=>{
              return (
                <View
                  style={{
                    height:SIZES.height,
                    width:SIZES.width
                  }}
                >
                  {item.label==constants.screens.home && <Home />}
                  {item.label==constants.screens.search && <Search />}
                  {item.label==constants.screens.bookmark && <Bookmark />}
                  {item.label==constants.screens.notification && <Notification />}
                </View>
              )
            }}
          />
        </View>
        
        {/* Footer */}
        <View style={{height:100,justifyContent:'flex-end'}}>

        <LinearGradient
            start={{x:0, y:0}}
            end={{x:0,y:4}}
            colors={[
              'transparent',
              'black',
              
            ]}
            style={{
              position:'absolute',
              left:0,
              right:0,
              height:150,
              borderTopRightRadius:15,
              borderTopLeftRadius:15
            }}
          />

          {/* Tabs */}
          <View
          style={{
            flex:1,
            flexDirection:'row',
            paddingHorizontal:SIZES.radius,
            paddingBottom:10,
            bottom: 20,
            marginHorizontal: 15,
            height:50,
            borderRadius: 23,
            backgroundColor:COLORS.white
          }}>
          

            <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab==constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            onPress={()=>setSelectedTab(constants.screens.home)}
            />

            <TabButton
            label={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab==constants.screens.search}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
            onPress={()=>setSelectedTab(constants.screens.search)}
            />

            <TabButton
            label={constants.screens.bookmark}
            icon={icons.bookmark}
            isFocused={selectedTab==constants.screens.bookmark}
            outerContainerStyle={bookmarkFlexStyle}
            innerContainerStyle={bookmarkColorStyle}
            onPress={()=>setSelectedTab(constants.screens.bookmark)}
            />

            <TabButton
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab==constants.screens.notification}
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
            onPress={()=>setSelectedTab(constants.screens.notification)}
            />
          </View>
        </View>

      </Animated.View>

    </View>
  );
};

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
(MainLayout)

