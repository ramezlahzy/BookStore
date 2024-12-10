import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { updateDoc } from "../../../firebase/config";
import { addDoc, collection, firestore, doc } from "../../../firebase/config";
import { launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission } from "../../../components/Permissions";
import Chip from "../../../components/Chip";
import i18n from "../../../i18n";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#000000", "#ffffff", "#ff00ff", "#00ffff"];

const HandleProduct = ({
    CATEGORIES,
    Languages
}
    : {
        Languages: string[],
        CATEGORIES: string[]
    }
) => {
    const { colors } = useTheme();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [productName, setProductName] = useState('');
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [description, setDescription] = useState('');
    const [imageError, setImageError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        bookName: "",
        description: "",
        imageUrl: "",
        language: "",
        category: "",
    })
    const validate = () => {
        let valid = true;
        if (!imageUri) {
            setImageError(true)
            valid = false;
        } else
            setImageError(false)
        if (productName === '') {
            setNameError(true)
            valid = false;
        } else
            setNameError(false)

        const currentDate = new Date();

        if (valid) {
            // upLoadProduct(product, setLoading).then(r => {
            //     console.log("uploaded")
            //     closeFilterModal()
            //     // refreshProducts()
            // })
        }
        return valid;
    }

    const pickImage = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (result.assets && result.assets.length > 0) {
            console.log('Selected Image:', result.assets[0].uri);
        } else {
            console.log('No image selected.');
        }
    };


    return (

        <View style={{ padding: 6, gap: 16, flex: 1, flexGrow: 1, paddingBottom: 14 }}>
            <TouchableOpacity
                onPress={pickImage}
                style={{
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: 16,
                    backgroundColor: colors.card,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: 'grey',
                    borderWidth: .4,

                }}
            >
                {
                    !imageUrl &&
                    <Text style={{
                        color: colors.text, opacity: 1,

                        justifyContent: "center", textAlign: 'center',
                    }}>
                        {i18n.t("addImage")}
                    </Text>
                }

                {
                    imageUrl && <Image
                        source={{ uri: imageUrl }}
                        style={{
                            width: "100%",
                            aspectRatio: 1,
                            borderRadius: 16,
                        }}
                    />
                }
            </TouchableOpacity>
            <Text>
                {error}
            </Text>
            {
                imageError && <Text style={{ color: 'red', textAlign: 'center' }}>
                    {i18n.t("chooseImage")}
                </Text>
            }

            <View style={{ paddingHorizontal: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                    {i18n.t("bookName")}
                </Text>
                <TextInput
                    placeholder={i18n.t("bookName")}
                    style={[styles.input]}
                    onChangeText={(text) =>
                        setFormData({ ...formData, bookName: text })
                    }
                />
                {
                    nameError && <Text style={{ color: 'red' }}>
                        {i18n.t("enterBookName")}
                    </Text>
                }
            </View>

            <View style={{ paddingHorizontal: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                    {i18n.t("language")}
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>

                    {Languages.map((item, i) => {
                        return (
                            <Chip
                                allItems={"selectedSizes"}
                                setAllItems={() => {
                                    console.log(item)
                                    setFormData({ ...formData, language: item })
                                }}
                                setIsAllSelected={() => { }}
                                item={item}
                                label={i18n.t(item)}
                                isSelected={
                                    formData.language === item
                                }
                                isAllSelected={false}
                                chooseMany={false}
                            />
                        );
                    })}
                </View>
            </View>

            <View style={{ paddingHorizontal: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                    {i18n.t("categories")}
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>

                    {CATEGORIES.map((item, i) => {
                        return (
                            <Chip
                                allItems={"none"}
                                setAllItems={() => {
                                    setFormData({ ...formData, category: item })
                                    console.log(formData)
                                }
                                }
                                setIsAllSelected={() => ""}
                                item={item}
                                label={
                                    i18n.t(item)
                                }
                                isSelected={
                                    formData.category === item
                                }
                                isAllSelected={false}
                                chooseMany={true}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={{ paddingHorizontal: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                    {i18n.t("description")}
                </Text>

                <TextInput
                    placeholder={i18n.t("description")}
                    style={[styles.input, { height: 80, width: '80%' }]}
                    multiline={true}
                    numberOfLines={3}
                    maxLength={150}
                    onChangeText={
                        (text) => {
                            setFormData({ ...formData, description: text })
                        }
                    }
                />
            </View>




            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    height: 44,
                    width: 94,
                    borderRadius: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    flexDirection: "row",
                    padding: 12,
                    alignSelf: "center",
                }}
                onPress={validate}
            >
                <Text style={{ color: colors.text, fontFamily: 'bold' }}>
                    {i18n.t("save")}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        width: "50%",
        fontSize: 15,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'right'
    }
});


// const upLoadProduct = async (product, setLoading) => {
//     setLoading(true)
//     try {
//         const docRef = await addDoc(collection(firestore, "Products"), product);
//         await updateDoc(doc(firestore, "Products", docRef.id), { id: docRef.id });
//     } catch (error) {

//         console.error("Error adding product:", error);
//     }
//     setLoading(false)
// }
export default HandleProduct;
