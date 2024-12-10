import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList, RefreshControl, Platform,
    Alert,
} from "react-native";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useTheme } from "@react-navigation/native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../../components/CustomBackdrop";
import FilterView from "../../../components/FilterView"
import { FlaTCategories, Items } from "../../../components/AllItems"
import {
    // displayAd,
    // getLanguage,
    loadAllCategories,
    loadAllProducts,
    loadBestSales,
    loadUser,
    // translate
} from "../../../BackEnd/Gets";
import LoadingHomeScreen from "./LoadingHomeScreen";
import { auth } from "../../../firebase/config";
import { BestChoice, Minus, Setting } from "../../../../assets";
import i18n from "../../../i18n";
import HandleProduct from "./HandleProduct";
import AddButton from "../../../components/Add";


const HomeScreen = ({ navigation, extraData }: any) => {
    const { colors } = useTheme();
    console.log('extraData', extraData)

    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [profileImage, setProfileImage] = useState('null');
    const [profileName, setProfileName] = useState(extraData?.fullName);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allCategories, setAllCategories] = useState<string[]>([]);

    const [allProductsShuffled, setAllProductsShuffled] = useState([]);
    const [isLoadingHome, setIsLoadingHome] = useState(false);
    const [salesProductsShuffled, setSalesProductsShuffled] = useState([]);
    const [existFilter, setExistFilter] = useState(false);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        setProfileImage('https://www')
        setProfileName(extraData?.fullName)
    }, [userProfile])
    useEffect(() => {
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        // if (selectedCategory === translate('all',getLanguage())) {
        //     setAllProductsShuffled(shuffled)
        // } else if (selectedCategory === translate('sale',getLanguage())) {
        //     const products = shuffled.filter(product => product.existSale)
        //     setAllProductsShuffled(products)
        // } else {
        //     const products = shuffled.filter(product => product.category === selectedCategory)
        //     setAllProductsShuffled(products)
        // }
    }, [allProducts, selectedCategory])
    useEffect(() => {
        setIsLoadingHome(true)
        loadAllProducts(setAllProducts).then(r => {
            loadAllCategories(setAllCategories).then(r => {
                setIsLoadingHome(false)
            }).catch(e => {
                setIsLoadingHome(false)
            })
        }).catch(e => {
            setIsLoadingHome(false)
        })
    }, [])



    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const refresh = () => {
        setLoading(true);
        loadAllProducts(setAllProducts).then(r => {
            loadAllCategories(setAllCategories).then(r => {
                setLoading(false)
                setIsLoadingHome(false)
            })
        })
            .catch(e => {
                setLoading(false)
                setIsLoadingHome(false)
                setIsLoadingHome(false)
            });
    }

    const openFilterModal = useCallback(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    }, []);

    const closeFilterModal = useCallback(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }
    }, []);

   
    return (
        <View style={{ flex: 1 }}>
            <AddButton openAddModel={() => {
                navigation.navigate('AddProduct')

            }
            } />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refresh}
                    />
                }
                style={{ flex: 1, backgroundColor: colors.background }}

            >
                <SafeAreaView style={{
                    paddingVertical: 24, gap: 24,
                }}>
                    <>
                        <View
                            style={{
                                paddingHorizontal: 24,
                                flexDirection: "row",
                                gap: 8,
                            }}
                        >

                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "600",
                                        marginBottom: 8,
                                        color: colors.text,
                                    }}
                                    numberOfLines={1}
                                >
                                    {

                                        i18n.t('hi') + ', ' + profileName + ' 👋'
                                    }
                                </Text>
                                <Text
                                    style={{ color: colors.text, opacity: 0.75 }}
                                    numberOfLines={1}
                                >
                                    {
                                        i18n.t('findYourBook')
                                    }
                                    {/* {translate('discover_new_fashion',getLanguage())} */}
                                </Text>
                            </View>

                        </View>
                    </>
                    <TouchableOpacity
                        style={{
                            width: '90%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderRadius: 52,
                            // backgroundColor:'white',
                            shadowColor: "#000",
                            backgroundColor: existFilter ? colors.primary : 'white',
                            elevation: 5,
                            alignSelf: 'center',
                        }}
                        onPress={() =>
                            existFilter ?
                                setExistFilter(false)
                                :
                                openFilterModal()
                        }
                    >

                        <View
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "600",
                                    color: existFilter ? 'white' : 'black',
                                    textAlign: 'center',
                                }}
                            >
                                {
                                    existFilter ?
                                        i18n.t('removeFilter')
                                        :
                                        i18n.t('filter')
                                }
                            </Text>
                        </View>
                        <View
                            style={{
                                width: 52,
                                aspectRatio: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 52,
                                backgroundColor: existFilter ? 'white' : colors.primary,
                            }}
                        >
                            <Image
                                source={existFilter ? Minus : Setting}
                                style={{
                                    width: 24, aspectRatio: 1, borderRadius: 24,
                                    height: 24
                                }}
                                resizeMode="contain"
                            />

                        </View>
                    </TouchableOpacity>
                    {
                        !existFilter &&

                        <>
                            <View style={{ paddingHorizontal: 24 }}>
                                <Text
                                    style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
                                >
                                    {i18n.t('thebestChoice')}
                                </Text>

                                <Image
                                    source={BestChoice}
                                    style={{
                                        width: '100%', aspectRatio: 1.5, borderRadius: 24, marginTop: 8

                                        , height: undefined
                                    }}
                                    resizeMode="contain"
                                />

                            </View>
                            <FlaTCategories showedCategories={allCategories} selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory} />
                        </>
                    }

                    <Items viewProducts={allProductsShuffled} navigation={navigation} user={userProfile}
                        filter={filter}
                        existFilter={existFilter}
                    />
                </SafeAreaView>
                <BottomSheet
                    Ref={bottomSheetModalRef}
                >
                    <FilterView
                        closeFilterModal={closeFilterModal}
                        CATEGORIES={allCategories}
                        setExistFilter={setExistFilter}
                        setFilter={setFilter}
                    />
                </BottomSheet>

            </ScrollView>
          

        </View>
    );
};



const BottomSheet = ({ Ref, children }: any) => {
    return (
        <BottomSheetModal
            snapPoints={["50%", "85%"]} // Example snap points
            index={0}
            ref={Ref}
            backdropComponent={(props) => <CustomBackdrop {...props} />}
            backgroundStyle={{
                borderRadius: 24,
                backgroundColor: 'white',
            }}
            handleIndicatorStyle={{ backgroundColor: 'black' }}
            keyboardBehavior="interactive" // or "extend" based on the library
            enablePanDownToClose={false}

        >
            <BottomSheetScrollView>
                {children}
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}

export default HomeScreen;
