import {useState} from "react";
import { db } from "./config";

// firebase imports
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (c) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let ref = collection(db, c);
        const unsub = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id });
            })
            setData(results) })
        return () => {
            unsub();
        }
    }, [c])
    return data;
}