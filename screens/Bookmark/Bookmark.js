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
import { HorizontalFoodCard, LargeFoodCard, VerticalFoodCard } from '../../components';

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

const Bookmark = () => {
    const [selectedCategoryId, setSelectedCategoryId]=React.useState(1)
    const [selectedMenuType, setSelectedMenuType]=React.useState(1)
    const [recommends, setRecommends] = React.useState([])
    const [menuList,setMenuList] = React.useState([])

    React.useEffect(()=>{
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    },[])

    function handleChangeCategory(categoryId, menuTypeId) {
        // Retrieve recommended menu
        let selectedRecommend = dummyData.menu.find(a=>a.name=="Recommended")
        //Find Menu based on ID
        let selectedMenu = dummyData.menu.find(a=>a.id==menuTypeId)
        // Set the recommended menu based on categoryId
        setRecommends(selectedRecommend?.list.filter(a=>a.categories.includes(categoryId)))
        // Set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a=>a.categories.includes(categoryId)))
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
                            onPress={()=>console.log("LargeFoodCard")}
                            item={item}/>
                        )
                    }}

                />

            </Section>
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Bookmark */}
            <FlatList
                data={menuList}
                keyExtractor={(item)=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>

                        {/* Recommended */}
                        {renderRecommendedSection()}

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
                            onPress={()=>console.log("HorizontalFoodCard")}
                        />
                    )
                }}
                ListFooterComponent={<View style={{height:210}}/>}
            />
        </View>
    )

}

export default Bookmark