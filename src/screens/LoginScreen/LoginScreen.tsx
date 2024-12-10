import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './styles';
import LoadingModal from '../../utils/LoadingModal';
import { auth, db } from '../../firebase/config';
import LoginImage from '../../../assets/loginScreenImage.png';
import i18n from '../../i18n';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '267775855380-ndf8oh65iupofucjfpg90clgg0tkme22.apps.googleusercontent.com'
        });
    }, []);

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    };

    const onLoginPress = async () => {
        setIsLoading(true);
        if (!email.trim() || !password.trim()) {
            setError(i18n.t('pleaseEnterBoth'));
            setIsLoading(false);
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const userDoc = await getDoc(doc(db, 'users', uid));
            if (!userDoc.exists()) {

                setError(i18n.t('userDoesNotExist'));
                return;
            }
            const userData = userDoc.data();
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            navigation.navigate('Home', { user: userData });
        } catch (error: any) {
            console.log(error);
            if(error.code === 'auth/user-not-found'){
                setError(i18n.t('userNotFound'));
                return;
            }
            if(error.code === 'auth/wrong-password'){
                setError(i18n.t('wrongPassword'));
                return;
            }
            if(error.code === 'auth/invalid-email'){
                setError(i18n.t('invalidEmail'));
                return;
            }
            if(error.code === 'auth/too-many-requests'){
                setError(i18n.t('tooManyRequests'));
                return;
            }
            if(error.code === 'auth/network-request-failed'){
                setError(i18n.t('networkRequestFailed'));
                return;
            }
            if(error.code === 'auth/internal-error'){
                setError(i18n.t('internalServerError'));
                return;
            }
            if(error.code === 'auth/invalid-credential'){
                setError(i18n.t('invalidCredential'));
                return;
            }

            setError(i18n.t('failedToLogin'));
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',marginBottom:80 }}>
                    <Image
                        source={LoginImage}
                        style={{
                            width: '100%',
                            height:undefined,
                            aspectRatio: 1.55, // aspect ratio is 1.5:1
                            resizeMode: 'cover', // Adjust based on how you want the image to behave
                        }}
                    />
                </View>


                <View style={{ width: '70%', alignSelf: 'center' }}>
                    <TextInput
                        style={{
                            marginTop: 20, height: 50, borderColor: '#6C6A6A', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
                            color: 'black', textAlign: 'right'

                        }}
                        placeholder={i18n.t('email')}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{
                            marginTop: 20, height: 50, borderColor: '#6C6A6A', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
                            color: 'black', textAlign: 'right'
                        }}
                        placeholder={i18n.t('password')}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />

                    {error ? <Text style={{ color: 'red' 

                        , textAlign: 'center', marginTop: 10, marginBottom: 10
                    }}>{error}</Text> : null}
                    <TouchableOpacity onPress={onLoginPress} style={{ backgroundColor: '#FFC600', marginTop: 40, padding: 15, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {i18n.t('login')}
                        </Text>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 5 }}>
                        <Text style={{ color: '#6C6A6A' }}>
                            {i18n.t('dontHaveAccount')}
                        </Text>
                        <TouchableOpacity onPress={onFooterLinkPress}>
                            <Text style={{ color: '#FFC600' }}>
                                {i18n.t('register')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <LoadingModal isVisible={isLoading} />
        </View>
    );
}
