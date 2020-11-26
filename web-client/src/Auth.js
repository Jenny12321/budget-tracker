import * as firebase from "firebase/app";
import "firebase/auth";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const currentUserInfo = useRef(null);
    const isNewUser = useRef(false);
    const isUserSignedOut = useRef(false);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    useEffect(() => {
        if (currentUser && !isNewUser.current) {
            var loginUrl = process.env.REACT_APP_LOGIN_USER_URL;

            var uid = currentUser.uid;

            Axios.post(loginUrl, {}, {
                params: {
                    userId: uid
                },
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    var result = response.data.result;

                    currentUserInfo.current = {
                        firstName: result.firstName,
                        lastName: result.lastName
                    }

                    setIsUserAuthenticated(true);
                }
            }).catch((error) => {
                app.auth().signOut();
                setIsUserAuthenticated(false);
                isUserSignedOut.current = false;
            });
        }
        else if (currentUser && isNewUser.current) {
            var createUserUrl = process.env.REACT_APP_CREATE_USER_URL;
            var firstName = currentUserInfo.current.firstName || "";
            var lastName = currentUserInfo.current.lastName || "";
            var uid = currentUser.uid;

            Axios.post(createUserUrl, {}, {
                params: {
                    userId: uid,
                    firstName: firstName,
                    lastName: lastName
                },
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    var result = response.data.result;

                    currentUserInfo.current = {
                        firstName: result.firstName,
                        lastName: result.lastName
                    }

                    setIsUserAuthenticated(true);
                }

                isNewUser.current = false;
            }).catch((error) => {
                app.auth().signOut();
                setIsUserAuthenticated(false);
                isUserSignedOut.current = false;
            });
        }
        else if (!currentUser && isUserSignedOut.current) {
            var logoutUserUrl = process.env.REACT_APP_LOGOUT_USER_URL;

            Axios.post(logoutUserUrl, {}, {
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.success) {
                    currentUserInfo.current = null;
                    setIsUserAuthenticated(false);

                    isUserSignedOut.current = false;
                }
            }).catch((error) => {
                setIsUserAuthenticated(false);
                isUserSignedOut.current = false;
            })
        }
    }, [currentUser])
    
    return (
        <AuthContext.Provider value={{currentUser, isNewUser, currentUserInfo, isUserAuthenticated, isUserSignedOut}}>
            {children}
        </AuthContext.Provider>
    )
}