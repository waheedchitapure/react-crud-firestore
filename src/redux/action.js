import { type } from '@testing-library/user-event/dist/type';
import * as types from './actionTypes';
import db from '../firebase';

const getContacts =(contacts) =>( {
    type:types.GET_CONTACTS,
    payload : contacts,
   
});
const addContact =()=>({
    type:types.ADD_CONTACT,
    
})
const deleteContact =()=>({
    type:types.DELETE_CONTACT,
    
});

const updateContact =()=>({
    type:types.UPDATE_CONTACT,
    
})
const getContact =(contact)=>({
    type:types.GET_CONTACT,
    payload:contact
    
});

export const reset =()=>({
    type:types.RESET,
})


export const getContactsInitiate = ()=>{
    return function (dispatch){
        db.collection("contacts").onSnapshot((querySnapshot)=>{
            const contacts = [];
            querySnapshot.forEach((doc)=>{
                contacts.push({...doc.data(),id:doc.id});
            })
            dispatch(getContacts(contacts));
        });
    };
};


export const addContactInitiate = (contact)=>{
    return function (dispatch){
        db.collection("contacts").doc().set(contact);
        dispatch(addContact());
    };
};


export const deleteContactInitiate = (id)=>{
    return function (dispatch){
        db.collection("contacts").doc(id).delete();
        dispatch(deleteContact());
    };
};

export const updateContactInitiate  = (id , contact)=>{
    return function (dispatch){
        db.collection("contacts").doc(id).update(contact);
        dispatch(updateContact());
    };
};

export const getContactInitiate = (id)=>{
    return function (dispatch){
        db.collection("contacts").doc(id).get().then((contact)=>{

            dispatch(getContact({...contact.data()}));
        }).catch((error)=> console.log(error))
    }
}