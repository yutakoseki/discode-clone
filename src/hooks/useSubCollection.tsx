import { useEffect, useState } from 'react'
import { DocumentData, Query, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useAppSelector } from '../app/hooks';

interface Channels {
    id: string;
    channel: DocumentData;
}

const useSubCollection = (data: string) => {
    const channelId = useAppSelector((state) => state.channel.channelId);
    const [documents, setDocuments] = useState<Channels[]>([]);
    const collectionRef: Query<DocumentData> = query(collection(db, "channels"));

    useEffect(() => {
        let collectionRef = collection(
        db,
        "channels",
        String(channelId),
        "messages"
        );
    
        const collectionRefOrderBy = query(
        collectionRef,
        orderBy("timestamp", "asc")
        );
    
        onSnapshot(collectionRefOrderBy, (snapshot) => {
        let results: Messages[] = [];
        snapshot.docs.forEach((doc) => {
            results.push({
            timestamp: doc.data().timestamp,
            message: doc.data().message,
            user: doc.data().user,
            })
        });
        setMessages(results);
        console.log(results)
        })
    
    }, [channelId])
        return { documents }
    }

export default useSubCollection