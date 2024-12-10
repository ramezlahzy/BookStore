import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Welcome to Book Store
// Your one stop destination for all your books needs !
// Let's Start
// Login Account
// Welcome back  
// E-mail
// Login
// Register
// Don't have an account?
// Craete Account
// Hope you enjoy the app
// Full Name
// Confirm Password
// Already have an account?
// Please enter both email and password.'
// User does not exist anymore.
// Failed to login. Please try again.
// User not found
// Wrong password
// Invalid email
// Too many requests
// Network request failed
// Internal server error
// Invalid email or password
// Home
// Profile
// Chat
// التصنيفات:
// ١**-** كتب باللغة العربية :
// ◦ كتب مدرسية
// ◦ كتب أطفال
// ◦ كتب دينية
// ◦ كتب علمية
// ◦ كتب أدبية
// ◦ كتب اجتماعية
// ◦ كتب فلسفة
// ◦ كتب تاريخية
// ◦ قصص وروايات
// ◦ كتب مال واقتصاد
// ◦ كتب طبية
// ◦ كتب ادارة اعمال
// ◦ كتب تطوير الذات
// ◦ كتب فن وتصميم



// ٢- كتب باللغة الانجليزية:
const resources = {
    en: {
        translation: {
            welcome: "Welcome to Book Store",
            oneStop: "Your one stop destination for all your books needs !",
            letsStart: "Let's Start",
            login: "Login Account",
            welcomeBack: "Welcome back",
            email: "E-mail",
            password: "Password",
            login: "Login",
            register: "Register",
            dontHaveAccount: "Don't have an account?",
            createAccount: "Create Account",
            hopeYouEnjoy: "Hope you enjoy the app",
            fullName: "Full Name",
            confirmPassword: "Confirm Password",
            alreadyHaveAccount: "Already have an account?",
            pleaseEnterBoth: "Please enter both email and password.",
            userDoesNotExist: "User does not exist anymore.",
            failedToLogin: "Failed to login. Please try again.",
            userNotFound: "User not found",
            wrongPassword: "Wrong password",
            invalidEmail: "Invalid email",
            tooManyRequests: "Too many requests",
            networkRequestFailed: "Network request failed",
            internalServerError: "Internal server error",
            invalidCredential: "Invalid email or password",
            emailAlreadyInUse: "The email address is already in use by another account.",
            weakPassword: "Choose a stronger password.",
            failedToRegister: "Failed to register. Please try again.",
            pleaseFillAllFields: "Please fill all fields",
            passwordsDoNotMatch: "Passwords do not match",
            home: "Home",
            profile: "Profile",
            chat: "Chat",
            language: "Language",
            categories: "Categories",
            arabicBooks: "Arabic Books",
            englishBooks: "English Books",
            schoolBooks: "School Books",
            childrenBooks: "Children Books",
            religiousBooks: "Religious Books",
            scientificBooks: "Scientific Books",
            literaryBooks: "Literary Books",
            socialBooks: "Social Books",
            philosophicalBooks: "Philosophical Books",
            historicalBooks: "Historical Books",
            storiesAndNovels: "Stories and Novels",
            moneyAndEconomyBooks: "Money and Economy Books",
            medicalBooks: "Medical Books",
            businessManagementBooks: "Business Management Books",
            selfDevelopmentBooks: "Self Development Books",
            artAndDesignBooks: "Art and Design Books",
            search: "Search",
            all: "All",
            apply: "Apply",
            thebestChoice: "Best Choice",
            hi: "Hi",
            findYourBook: "Find your book",
            filter: "Filter",
            removeFilter: "Remove Filter",
            reset: "Reset",
            addImage: "Add Image",
            chooseImage: "Choose Image",
            enterBookName: "Enter Book Name",
            description: "Description",
            save: "Save",
            bookName: "Book Name",


        },

    },
    ar: {
        translation: {
            welcome: "مرحبا بك في متجر الكتب",
            oneStop: "وجهتك الواحدة لجميع احتياجاتك من الكتب!",
            letsStart: "لنبدأ",
            login: "تسجيل الدخول",
            welcomeBack: "مرحبا بعودتك",
            email: "البريد الإلكتروني",
            password: "كلمه السر",
            login: "تسجيل الدخول",
            register: "تسجيل",
            dontHaveAccount: "ليس لديك حساب؟",
            createAccount: "إنشاء حساب",
            hopeYouEnjoy: "آمل أن تستمتع بالتطبيق",
            fullName: "الاسم الكامل",
            confirmPassword: "تأكيد كلمة المرور",
            alreadyHaveAccount: "هل لديك حساب؟",
            pleaseEnterBoth: "الرجاء إدخال كل من البريد الإلكتروني وكلمة المرور.",
            userDoesNotExist: "المستخدم لم يعد موجودًا.",
            failedToLogin: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
            userNotFound: "المستخدم غير موجود",
            wrongPassword: "كلمة السر خاطئة",
            invalidEmail: "البريد الإلكتروني غير صالح",
            tooManyRequests: "طلبات كثيرة",
            networkRequestFailed: "فشل طلب الشبكة",
            internalServerError: "خطأ داخلي في الخادم",
            invalidCredential: "البريد الإلكتروني أو كلمة المرور غير صالحة",
            emailAlreadyInUse: "عنوان البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر.",
            weakPassword: "اختر كلمة مرور أقوى.",
            failedToRegister: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
            pleaseFillAllFields: "الرجاء ملء جميع الحقول",
            passwordsDoNotMatch: "كلمات المرور غير متطابقة",
            home: "الرئيسية",
            profile: "الملف الشخصي",
            chat: "الدردشة",
            language: "اللغة",
            categories: "التصنيفات",
            arabicBooks: "كتب باللغة العربية",
            englishBooks: "كتب باللغة الانجليزية",
            schoolBooks: "كتب مدرسية",
            childrenBooks: "كتب أطفال",
            religiousBooks: "كتب دينية",
            scientificBooks: "كتب علمية",
            literaryBooks: "كتب أدبية",
            socialBooks: "كتب اجتماعية",
            philosophicalBooks: "كتب فلسفة",
            historicalBooks: "كتب تاريخية",
            storiesAndNovels: "قصص وروايات",
            moneyAndEconomyBooks: "كتب مال واقتصاد",
            medicalBooks: "كتب طبية",
            businessManagementBooks: "كتب ادارة اعمال",
            selfDevelopmentBooks: "كتب تطوير الذات",
            artAndDesignBooks: "كتب فن وتصميم",
            search: "بحث",
            all: "الكل",
            apply: "تطبيق",
            thebestChoice: "الاختيار الأفضل",
            hi: "مرحبا",
            findYourBook: "ابحث عن كتابك",
            filter: "تصفية",
            removeFilter: "إزالة التصفية",
            reset: "إعادة تعيين",
            addImage: "إضافة صورة",
            chooseImage: "اختر صورة",
            enterBookName: "أدخل اسم الكتاب",
            description: "الوصف",
            save: "حفظ",
            bookName: "اسم الكتاب",

            
        },
    },

};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3', // Compatibility with older versions of React Native
        resources,
        lng: 'ar', // Set default language to Arabic
        fallbackLng: 'ar',
        interpolation: {
            escapeValue: false, // React already safes from XSS
        },
    });

export default i18n;
