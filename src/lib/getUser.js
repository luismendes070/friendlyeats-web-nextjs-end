import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from '@/src/lib/firebase/firebase'
import { useRouter } from 'next/navigation'

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/src/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

export function getUser() {
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (user === undefined) return;

            // refresh when user changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh();
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, router]);

    return user;
}


