import { AsyncStorage } from "react-native";

// export default MOODS = [
//     {id:1,mood:5,title:"Parfait"},
//     // {id:2,mood:4,title:"Bien"},
//     // {id:3,mood:3,title:"Normal"},
//     // {id:4,mood:2,title:"Pas bien"},
//     // {id:5,mood:1,title:"Mal"},
// ];

// export const getItems = async (key) => {
//     try {
//         const values = await AsyncStorage.getItem(key);
//         return JSON.parse(values);
//
//     } catch (e) {
//         console.log('ERROR STORE.JS getItems- ',e.toString());
//     }
// }
//
// export const setItems = async (key,values) => {
//     try {
//         const values = await AsyncStorage.setItem(key,JSON.stringify(values));
//
//     } catch (e) {
//         console.log('ERROR STORE.JS setItems - ',e.toString());
//     }
// }
//
// export const removeItem = async (key) => {
//     try {
//         await AsyncStorage.removeItem(key);
//         return true;
//     }
//     catch(exception) {
//         return false;
//     }
// }