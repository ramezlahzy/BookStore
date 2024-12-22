

import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const requestCameraPermission = async () => {
    try {
        const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (alreadyGranted) {
            console.log('Camera permission already granted');
            return true;
        }

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission granted');
            return true;
        } else {
            console.log('Camera permission denied');
            return false;
        }
    } catch (err) {
        console.error('Error requesting camera permission:', err);
        return false;
    }
};



export { requestCameraPermission };