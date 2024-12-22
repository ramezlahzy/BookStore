import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from '../../utils/LoadingModal';
import i18n from '../../i18n';
import { UserType } from '../../types/types/user.types';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../api/auth';
import { RegisterRequestType } from '../../types/types/auth.types';
import { TextInputForm } from '../../components/Texts';
import { onSubmit } from '../../BackEnd/helpers';
import { RegisterValidator } from '../../types/validators/auth.validator';
import { RegisterScreenImage } from '../../../assets';

export default function RegistrationScreen({ navigation }: any) {
    const [formData, setFormData] = useState<RegisterRequestType>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (user: UserType) => {
            navigation.navigate('Home', { user });
        },
    }
    );

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20 }}>
                    <Image
                        source={RegisterScreenImage}
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1.7, // aspect ratio is 1.5:1
                            resizeMode: 'cover', // Adjust based on how you want the image to behave
                        }}
                    />
                </View>

                <View style={{ width: '70%', alignSelf: 'center' }}>

                    <TextInputForm
                        itemValue={formData.fullName}
                        setItemValue={(text: any) => setFormData({ ...formData, fullName: text })}
                        error={errors.fullName}
                        placeholder={i18n.t('fullName')}
                        value={formData.fullName}
                    />
                    
                    <TextInputForm
                        itemValue={formData.email}
                        setItemValue={(text: any) => setFormData({ ...formData, email: text })}
                        error={errors.email}
                        placeholder={i18n.t('email')}
                        value={formData.email}
                    />
                   
                    <TextInputForm
                        itemValue={formData.password}
                        setItemValue={(text: any) => setFormData({ ...formData, password: text })}
                        error={errors.password}
                        placeholder={i18n.t('password')}
                        value={formData.password}
                        secureTextEntry={true}
                    />
                
                    <TextInputForm
                        itemValue={formData.confirmPassword}
                        setItemValue={(text: any) => setFormData({ ...formData, confirmPassword: text })}
                        error={errors.confirmPassword}
                        placeholder={i18n.t('confirmPassword')}
                        value={formData.confirmPassword}
                        secureTextEntry={true}
                    />

                    {mutation.error?.message ?
                        (
                            <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{
                                mutation.error?.message
                            }</Text>
                        )
                        : null}
                    <TouchableOpacity onPress={
                        async (e: any) => {
                            onSubmit(mutation, formData, setErrors, RegisterValidator, e);
                        }
                    } style={{ backgroundColor: '#FFC600', marginTop: 40, padding: 15, borderRadius: 10 }}>
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
            <LoadingModal isVisible={mutation.isPending} />
        </View>
    );
}
