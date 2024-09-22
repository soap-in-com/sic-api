import admin from 'firebase-admin';

const serviceAccount = require(`${process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH}`)

// firebase 연동 설정
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: 'https://sicapp-ad8de-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

export const db = admin.database()
