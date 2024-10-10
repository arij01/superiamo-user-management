"use client";

import { SignOutButton } from "@/src/components/sign-out-button";
import { getAccountLinkStatus } from "@/src/lib/auth/AccountLinkStatusServerAction";
//import { getUserRole } from "@/src/lib/auth/getRoleServerAction";
//import { getUserName } from "@/src/lib/auth/getUserNameServer";
import { handleGoogleSignIn } from "@/src/lib/auth/googleSignInServerAction";
import { unlinkGoogleAccount } from "@/src/lib/auth/unlinkGoogleAccountServerAction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/src/lib/auth/getUserInfoServerAction"; 

export const DashboardPage: React.FC = () => {
    const [isAccountLinked, setIsAccountLinked] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        surname: "",
        dob: "",
        addresse: "",
        phone: "",
        role: "",
    });
    //const [role, setRole] = useState("");
    //const { update } = useSession();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const info = await getUserInfo(); 
                setUserInfo(info);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        const accountLinkStatus = async () => {
            try {
                const status = await getAccountLinkStatus();
                setIsAccountLinked(status);
            } catch (error) {
                console.error("Failed to get account link status:", error);
            }
        };

        fetchUserInfo(); 
        accountLinkStatus();
    }, []);
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Change format as needed
  };

    return (
        <div className="dashboard-page">
            <h2>Dashboard</h2>
            <div className="dashboard-card">
                <a href="/admin">Page Admin</a>
                
                <a href="/update">Modifier vos Information</a> 
               
                <div>
                    <p>Rôle: {userInfo.role}</p>
                </div>
                <div className="name">{userInfo.name}</div>
                <div className="name">{userInfo.surname}</div>
                <div className="name">{formatDate(userInfo.dob)}</div>
                <div className="name">{userInfo.addresse}</div>
                <div className="name">{userInfo.phone}</div>

                <div>
                    <button
                        className="link-account-button"
                        onClick={
                            isAccountLinked
                                ? async () => {
                                    await unlinkGoogleAccount().then(() => {
                                        setIsAccountLinked(false);
                                    });
                                }
                                : async () => {
                                    await handleGoogleSignIn().then(() => {
                                        setIsAccountLinked(true);
                                    });
                                }
                        }
                    >
                        {isAccountLinked
                            ? "Déconnecter votre compte Google"
                            : "Connecter votre compte Google"}
                    </button>
                </div>
                
                <div>
                    <SignOutButton className="signout-button" />
                </div>
               
            </div>
        </div>
    );
};
