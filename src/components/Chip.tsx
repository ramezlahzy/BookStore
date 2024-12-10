import { useTheme } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

const Chip = ({
    isSelected,
    left,
    allItems,
    setAllItems,
    item,
    isAllSelected,
    setIsAllSelected,
    label,
    chooseMany
}
    :
    {
        isSelected: boolean,
        left?: any,
        allItems: any,
        setAllItems: any,
        item: any,
        isAllSelected: boolean,
        setIsAllSelected: any,
        label: string,
        chooseMany: boolean
    }
) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            onPress={() => {
                if (item === "All") {
                    setIsAllSelected(!isAllSelected)
                    setAllItems([])
                    return
                }
                setIsAllSelected(false)
                if (isSelected) {
                    // if (!chooseMany)
                        setAllItems(allItems.filter((i: any) => i !== item));
                } else {
                    if (!chooseMany)
                        setAllItems([item]);
                    else
                        setAllItems([...allItems, item]);
                }
                console.log(allItems)
            }}
            style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 100,
                backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.background,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {!!left && <View style={{ marginRight: 0 }}>{left}</View>}
            {
                label &&
                <Text
                    style={{
                        fontSize: 14,
                        // fontWeight: "600",
                        color: isSelected
                            ? theme.colors.text
                            : theme.colors.text,

                    }}>
                    {label}
                </Text>
            }
        </TouchableOpacity>
    );
};


export default Chip;