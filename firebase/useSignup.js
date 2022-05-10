import {useState, useEffect} from 'react';

// firebase imports
import { auth } from './config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const useSignup = () => {
    const [error, setError] = useState(null);
    
    const signup = (email, password) => {
        setError(null);
        createUserWithEmailAndPassword(auth, email, password)

    }

    return {error, signup};
}
