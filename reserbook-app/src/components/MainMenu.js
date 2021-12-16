import { getAuth } from "@firebase/auth";
import { useUser } from "../Providers/UserProvider";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase_config";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const MainMenu = () => {
    const { setUser, user } = useUser();
    const handleSignOut = () => {
        setUser({});

        auth.signOut().then(() => {
            window.location.reload();
        }).catch((error) => console.error());
    };

    return (
        <nav className="main-menu">
            <ul>
                <li> <a href="/new-books">New books</a> </li>
                
                {user.name && (
                    <>
                <li> <a href="/my-books">My books</a> </li>
                
                <li> <a href="a" onClick={handleSignOut}> Sing Out </a> </li>
                    </>)}
            </ul>
        </nav >
    );
}