import * as Notifications from 'expo-notifications';
import { getDocs, collection, getFirestore } from "firebase/firestore"; 
import { User } from "firebase/auth";

const db = getFirestore();

const getInfo = async (currentUser: User) => {
    const infoList = [];
    const querySnapshot = await getDocs(collection(db, "Users", currentUser.uid, "Contacts"));
    querySnapshot.forEach((doc) => {
        infoList.push(doc.data());
    });
    return infoList;
};

const retrieveInfo = async (currentUser: User) => {
    try {
        const info = await getInfo(currentUser);
        return info;

    } catch (error) {
        console.error('Error retrieving contacts:', error);
        return []; 
    }
};

function isMultipleOfIter(oldDate, today, counter) {
    const timeDiff = today.getTime() + (24 * 60 * 60 * 1000) - oldDate.getTime();
    const daysDiff = Math.round(timeDiff / (24 * 60 * 60 * 1000));
    
    return daysDiff % counter === 0;
}



export const NOTIFICATION_TASK = 'notification-task';

export const registerNotificationTask = async (currentUser: User) => {
    const info = await retrieveInfo(currentUser);
    Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
    });

    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(11, 0, 0, 0);

    if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
    }

    var tasksExist;
    var counter = 0;

    const delay = targetTime.getTime() - now.getTime();
    for (let i = 0; i < info.length; i++) {
        if (isMultipleOfIter(new Date(info[i].startdate), now, parseInt(info[i].iterative))) {
            tasksExist = true;
            counter++
            break;
        }
    }

    if (tasksExist) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Reach out to old friends!',
                body: 'You have ' + counter + " tasks to complete today"
            },
            trigger: {
                seconds: delay / 1000,
                repeats: false,
            },
        });
    }

    return {
    status: "Success",
    shouldContinue: false,
    };
};