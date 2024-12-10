import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS, Languages } from "../BackEnd/Gets";
import i18n from "../i18n";
import Chip from "./Chip";
import { Forward } from "../../assets";

const MAX_PRICE = 5000;

const FilterView = ({ setExistFilter, CATEGORIES, closeFilterModal, setFilter }:
    { setExistFilter: any, CATEGORIES: any, closeFilterModal: any, setFilter: any }
) => {
    interface FilterViewProps {
        setExistFilter: (exist: boolean) => void;
        CATEGORIES: string[];
        closeFilterModal: () => void;
        setFilter: (filter: Filter) => void;
    }

    interface Filter {
        startPrice: number;
        endPrice: number;
        selectedColors: string[];
        selectedSizes: string[];
        selectedCategories: string[];
        isAllColorsSelected: boolean;
        isAllSizesSelected: boolean;
        isAllCategoriesSelected: boolean;
    }
    const [startPrice, setStartPrice] = useState(100);
    const [endPrice, setEndPrice] = useState(3000);
    const theme = useTheme();
    console.log(CATEGORIES)
    console.log(theme)
    const insets = useSafeAreaInsets();
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isAllColorsSelected, setIsAllColorsSelected] = useState(true);
    const [isAllSizesSelected, setIsAllSizesSelected] = useState(true);
    const [isAllCategoriesSelected, setIsAllCategoriesSelected] = useState(true);
    return (
        <View style={{ flex: 1 }}>
            <BottomSheetScrollView style={{ flex: 1 }}>
                <View style={{ paddingVertical: 24, gap: 24 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 24,
                        }}
                    >
                        <Text
                            style={{

                                fontSize: 20,
                                fontWeight: "700",
                                color: theme.colors.text,
                            }}
                        >
                            {i18n.t("filter")}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setStartPrice(100);
                                setEndPrice(3000);
                                setSelectedColors([]);
                                setSelectedSizes([]);
                                setSelectedCategories([]);
                                setIsAllColorsSelected(true);
                                setIsAllSizesSelected(true);
                                setIsAllCategoriesSelected(true);
                            }}
                            style={{
                                marginLeft: "auto",
                                padding: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.colors.text,
                                    opacity: 0.5,
                                }}
                            >
                                {i18n.t("reset")}
                            </Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ paddingHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("language")}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                            <Chip
                                label={i18n.t("all")}
                                isSelected={isAllSizesSelected}
                                setAllItems={setSelectedSizes}
                                allItems={selectedSizes}
                                item={"All"}
                                isAllSelected={isAllSizesSelected}
                                setIsAllSelected={setIsAllSizesSelected}
                                chooseMany={true}
                            />
                            {Languages.map((item, i) => {
                                return (
                                    <Chip
                                        allItems={selectedSizes}
                                        setAllItems={setSelectedSizes}
                                        setIsAllSelected={setIsAllSizesSelected}
                                        item={item}
                                        label={i18n.t(item)}
                                        chooseMany={true}
                                        isSelected={
                                            selectedSizes.includes(item)
                                        }
                                        isAllSelected={isAllSizesSelected}
                                    />
                                );
                            })}
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("categories")}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                            <Chip
                                label={i18n.t("all")}
                                isSelected={isAllCategoriesSelected}
                                setAllItems={setSelectedCategories}
                                allItems={selectedCategories}
                                item={"All"}
                                isAllSelected={isAllCategoriesSelected}
                                setIsAllSelected={setIsAllCategoriesSelected}
                                chooseMany={true}
                            />
                            {CATEGORIES.map((item, i) => {
                                return (
                                    <Chip
                                        allItems={selectedCategories}
                                        setAllItems={setSelectedCategories}
                                        setIsAllSelected={setIsAllCategoriesSelected}
                                        item={item}
                                        label={
                                            i18n.t(item)
                                        }
                                        isSelected={
                                            selectedCategories.includes(item)
                                        }
                                        chooseMany={true}
                                        isAllSelected={isAllCategoriesSelected}
                                    />
                                );
                            })}
                        </View>
                    </View>

                </View>
            </BottomSheetScrollView>
            <View
                style={{
                    padding: 24,
                    paddingBottom: 24 + insets.bottom,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFC600',// theme.colors.primary,
                        height: 64,
                        borderRadius: 64,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                    onPress={() => {
                        setExistFilter(true)
                        setFilter({
                            startPrice: startPrice,
                            endPrice: endPrice,
                            selectedColors: selectedColors,
                            selectedSizes: selectedSizes,
                            selectedCategories: selectedCategories,
                            isAllColorsSelected: isAllColorsSelected,
                            isAllSizesSelected: isAllSizesSelected,
                            isAllCategoriesSelected: isAllCategoriesSelected,
                        })
                        closeFilterModal()
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: theme.colors.text,
                        }}
                    >
                        {i18n.t("apply")}
                    </Text>

                    <View
                        style={{
                            backgroundColor: theme.colors.card,
                            width: 40,
                            aspectRatio: 1,
                            borderRadius: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bottom: 12,
                        }}
                    >
                        <Image source={Forward} style={{ width: 24, height: 24 }} />
                        {/* <Icons name="arrow-forward" size={24} color={theme.colors.text} /> */}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FilterView;
