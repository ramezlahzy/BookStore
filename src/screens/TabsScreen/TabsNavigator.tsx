import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { db, auth } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import LoadingModal from '../../utils/LoadingModal';
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import HomeScreen from './Home/HomeScreen';
import CustomBottomTabs from './CustomBottomTabs'
import { Image } from 'react-native';

const TabsStack = createBottomTabNavigator();

export default function TabsScreen(props: any) {

    console.log('propstabs', props);
    return (
        <TabsStack.Navigator
            screenOptions={{ tabBarShowLabel: false }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >

            <TabsStack.Screen
                name="Home"
                options={{
                    headerShown: false,
                   
                }}
            >
                {_ => <HomeScreen {...props} />}
            </TabsStack.Screen>

            <TabsStack.Screen
                name="chat"
                options={{
                    headerShown: false,
                }}
            >
                {_ => <HomeScreen {...props} />}
            </TabsStack.Screen>

            <TabsStack.Screen
                name="profile"
                options={{
                    headerShown: false,
                }}
            >
                {_ => <HomeScreen {...props} />}
            </TabsStack.Screen>




        </TabsStack.Navigator>
    );
}