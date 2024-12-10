import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import LoadingModal from '../../utils/LoadingModal';
import RegisterImage from '../../../assets/register.png';
import i18n from '../../i18n';

export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };

    const onRegisterPress = async () => {
        setError(''); // Clear previous error
        if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError(i18n.t('pleaseFillAllFields'));
            return;
        }

        if (password !== confirmPassword) {
            setError(i18n.t('passwordsDoNotMatch'));
            return;
        }

        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const data = {
                id: uid,
                email,
                fullName,
            };

            await setDoc(doc(db, 'users', uid), data);
            navigation.navigate('Home', { user: data });
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setError(i18n.t('emailAlreadyInUse'));
            } else if (error.code === 'auth/invalid-email') {
                setError(i18n.t('invalidEmail'));
            } else if (error.code === 'auth/weak-password') {
                setError(i18n.t('weakPassword'));
            } else if (error.code === 'auth/network-request-failed') {
                setError(i18n.t('networkRequestFailed'));
            } else {
                setError(i18n.t('failedToRegister'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20 }}>
                    <Image
                        source={RegisterImage}
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1.55, // aspect ratio is 1.5:1
                            resizeMode: 'cover', // Adjust based on how you want the image to behave
                        }}
                    />
                </View>

                <View style={{ width: '70%', alignSelf: 'center' }}>


                    <TextInput
                        style={{
                            marginTop: 20, height: 50, borderColor: '#6C6A6A', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
                            color: 'black', textAlign: 'right',
                        }}
                        placeholder={i18n.t('fullName')}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setFullName(text)}
                        value={fullName}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{
                            marginTop: 20, height: 50, borderColor: '#6C6A6A', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
                            color: 'black', textAlign: 'right',
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
                            color: 'black', textAlign: 'right',
                        }}
                        placeholder={i18n.t('password')}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{
                            marginTop: 20, height: 50, borderColor: '#6C6A6A', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
                            color: 'black', textAlign: 'right',
                        }}
                        placeholder={i18n.t('confirmPassword')}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        autoCapitalize="none"
                    />

                    {error ?
                     (
                        <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>
                     )
                     : null}
                    <TouchableOpacity onPress={onRegisterPress} style={{ backgroundColor: '#FFC600', marginTop: 40, padding: 15, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {i18n.t('createAccount')}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 5 }}>
                        <Text style={{ color: '#6C6A6A' }}>
                            {i18n.t('alreadyHaveAccount')}
                        </Text>
                        <TouchableOpacity onPress={onFooterLinkPress}>
                            <Text style={{ color: '#FFC600' }}>
                                {i18n.t('login')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <LoadingModal isVisible={isLoading} />
        </View>
    );
}
