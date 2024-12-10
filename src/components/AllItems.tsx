import { FlatList, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { downloadAndSavePhoto } from "../BackEnd/Gets";
import i18n from "../i18n";

const FlaTCategories = (
    { showedCategories, selectedCategory, setSelectedCategory }: any
) => {
    const { colors } = useTheme();

    return <FlatList
        data={showedCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
        }}
        renderItem={({ item, index }) => {
            const isSelected = selectedCategory === item;
            const isAll = selectedCategory === 'All';
            const isSale = selectedCategory === 'Sale';
            return (
                <>
                    {
                        index === 0 &&
                        <TouchableOpacity
                            onPress={() => setSelectedCategory("All")}
                            style={{
                                backgroundColor: isAll ? colors.primary : colors.card,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                borderRadius: 100,
                                shadowColor: "#000",
                                elevation: 5,
                                margin: 5,

                            }}
                        >
                            <Text
                                style={{
                                    color: isAll ? colors.background : colors.text,
                                    fontWeight: "600",
                                    fontSize: 14,
                                    opacity: isAll ? 1 : 0.5,
                                }}
                            >
                                {i18n.t('all')}
                                {/* {translate('all')} */}
                            </Text>
                        </TouchableOpacity>
                    }
                   
                    <TouchableOpacity
                        onPress={() => setSelectedCategory(item)}
                        style={{
                            backgroundColor: isSelected && item !== 'add' ? colors.primary : colors.card,
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                            borderRadius: 100,
                            shadowColor: "#000",
                            elevation: 5,
                            margin: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: isSelected ? colors.background : colors.text,
                                fontWeight: "600",
                                fontSize: 14,
                                opacity: isSelected ? 1 : 0.5,
                            }}
                        >
                            {i18n.t(item)}
                        </Text>
                    </TouchableOpacity>
                </>
            );
        }}
    />

}

const Items = ({ navigation, viewProducts, user, filter, existFilter }: any) => {
    const { colors } = useTheme();
    const [visibleItems, setVisibleItems] = useState([]);
    const onViewableItemsChanged = ({ viewableItems }: any) => {
        setVisibleItems(viewableItems);
    };

    // setFilter({
    //     startPrice: startPrice,
    //     endPrice: endPrice,
    //     selectedColors: selectedColors,
    //     selectedSizes: selectedSizes,
    //     selectedCategories: selectedCategories,
    //     isAllColorsSelected: isAllColorsSelected,
    //     isAllSizesSelected: isAllSizesSelected,
    //     isAllCategoriesSelected: isAllCategoriesSelected,
    // })
    function containsAnyElement(b: any, a: any) {
        console.log(a)
        return a.some((item:any) => b.includes(item));
    }
    if (existFilter)
        console.log(filter)
    return <FlatList
        data={viewProducts}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
            (!existFilter || ((
                item.price >= filter.startPrice && item.price < filter.endPrice) && (
                    filter.isAllColorsSelected === true || containsAnyElement(filter.selectedColors, item.colors)) && (
                    filter.isAllSizesSelected === true || containsAnyElement(filter.selectedSizes, item.sizes)) && (
                    filter.isAllCategoriesSelected === true || filter.selectedCategories.includes(item.category))
            )) &&
            <>
                <TouchableOpacity style={{ padding: 6 }}
                    onPress={() => {
                        navigation.navigate('OneProduct', { item: item, user: user });
                    }}
                >
                    <View
                        style={{
                            aspectRatio: index === 0 ? 1 : 2 / 3,
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 24,
                        }}
                    >
                        <Image
                            source={{
                                uri: item.imageUrl,
                            }}
                            resizeMode="cover"
                            style={StyleSheet.absoluteFill}
                        />


                        <View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    padding: 12,
                                },
                            ]}
                        >
                            {
                                item.existSale &&
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: 120,
                                        height: 20,
                                        backgroundColor: 'rgb(255,49,49)',
                                        position: "absolute",
                                        top: 25,
                                        // alignSelf:'flex-end',
                                        borderWidth: .2,
                                        borderColor: "#fff",
                                        left: -25,
                                        transform: [{ rotate: 
                                            I18nManager.isRTL ? '0deg' : '180deg' 
                                        }],
                                        justifyContent: "center",

                                    }}>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 12,
                                        }}
                                    >
                                        {
                                            // parse    (item.price*100/item.insteadOf)
                                            parseInt((100 - item.price * 100 / item.insteadOf).toString())
                                        }% off
                                    </Text>
                                </View>
                            }
                            <View style={{ flexDirection: "row-reverse", gap: 8, padding: 4 }}>
                                {/*<View*/}
                                {/*    style={{*/}
                                {/*        backgroundColor: colors.card,*/}
                                {/*        borderRadius: 100,*/}
                                {/*        height: 32,*/}
                                {/*        aspectRatio: 1,*/}
                                {/*        alignItems: "center",*/}
                                {/*        justifyContent: "center",*/}
                                {/*    }}>*/}
                                {/*    <Icons*/}
                                {/*        name="favorite-border"*/}
                                {/*        size={20}*/}
                                {/*        color={colors.text}*/}
                                {/*    />*/}
                                {/*</View>*/}
                            </View>
                            <View style={{ flex: 1 }} />
                            <View
                                // tint="dark"
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 6,
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    backgroundColor: "rgba(0,0,0,0.2)",
                                    justifyContent: "space-between",
                                }}
                                // intensity={30}

                            >
                                <Text
                                    style={{
                                        // flex: 1,

                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: "#fff",
                                        marginLeft: 8,
                                    }}
                                    numberOfLines={1}
                                >
                                    ${item.price}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        marginRight: 8,
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        borderRadius: 100,
                                        backgroundColor: "#fff",
                                    }}
                                    onPress={() => {
                                        downloadAndSavePhoto(item.imageUrl, "Offline Shop");
                                    }}
                                >
                                    {/* <Entypo name="download" size={14} color='grey' /> */}
                                </TouchableOpacity>
                            </View>

                            {/*<BlurView/>*/}
                        </View>
                    </View>
                </TouchableOpacity>
            </>

        )}
        onEndReachedThreshold={0.1}
    />
}
export { Items, FlaTCategories }

