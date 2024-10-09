"use client";
import { SignOutButton } from "@/src/components/sign-out-button";
import { getAccountLinkStatus } from "@/src/lib/auth/AccountLinkStatusServerAction";
import { getUserRole } from "@/src/lib/auth/getRoleServerAction";
import { getUserName } from "@/src/lib/auth/getUserNameServer";
import { handleGoogleSignIn } from "@/src/lib/auth/googleSignInServerAction";
import { unlinkGoogleAccount } from "@/src/lib/auth/unlinkGoogleAccountServerAction";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { setSurname } from "@/src/lib/auth/setSurnameServerAction";
import { setDob } from "@/src/lib/auth/setDobServerAction";
import { setAddress } from "@/src/lib/auth/setAddressServerAction";
import { setPhone } from "@/src/lib/auth/setPhoneServerAction";

export const DashboardPage: React.FC = () => {
    const [isAccountLinked, setIsAccountLinked] = useState(false);
    const [username, setUsername] = useState("");
    const [surname, setSurnameValue] = useState("");
    const [dob, setDobValue] = useState("");
    const [address, setAddressValue] = useState("");
    const [phone, setPhoneValue] = useState("");
    const [role, setRole] = useState("");
    const { update } = useSession();
  
    useEffect(() => {
      const userInfo = async () => {
        const name = await getUserName();
        if (name) {
          setUsername(name);
        }
  
        const role = await getUserRole();
        if (role) {
          setRole(role);
        }
      };
      const accountLinkStatus = async () => {
        try {
          const accountLinkStatus = await getAccountLinkStatus();
          setIsAccountLinked(accountLinkStatus);
        } catch (error) {
          console.error("Failed to get account link status:", error);
        }
      };
      userInfo();
      accountLinkStatus();
    }, []);

    const handleUpdateSurname = async () => {
        await setSurname(surname);
        // Handle success or error
    };

    const handleUpdateDob = async () => {
        await setDob(dob);
        // Handle success or error
    };

    const handleUpdateAddress = async () => {
        await setAddress(address);
        // Handle success or error
    };

    const handleUpdatePhone = async () => {
        await setPhone(phone);
        // Handle success or error
    };

    return (
      <div className="dashboard-page">
        <h2>Dashboard</h2>
        <div className="dashboard-card">
          <a href="/admin">Go to Admin Page</a>
          <div>
            <p>Role: {role}</p>
          </div>
          <div className="name">{username}</div>

          {/* Name input */}
          <div className="field-input-container">
            <input
              className="field-input"
              type="text"
              placeholder={"Enter name"}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <button
              className="update-field-button"
              onClick={() => update({ name: username })}
            >
              Update Name
            </button>
          </div>

          {/* Surname input */}
          <div className="field-input-container">
            <input
              className="field-input"
              type="text"
              placeholder={"Enter surname"}
              value={surname}
              onChange={(event) => setSurnameValue(event.target.value)}
            />
            <button
              className="update-field-button"
              onClick={handleUpdateSurname}
            >
              Update Surname
            </button>
          </div>

          {/* Date of Birth input */}
          <div className="field-input-container">
            <input
              className="field-input"
              type="date" // Correct input type for date of birth
              value={dob} // Ensure the value is in YYYY-MM-DD format
              onChange={(event) => setDobValue(event.target.value)}
            />
            <button
              className="update-field-button"
              onClick={handleUpdateDob}
            >
              Update Date of Birth
            </button>
          </div>

          {/* Address input */}
          <div className="field-input-container">
            <input
              className="field-input"
              type="text"
              placeholder={"Enter address"}
              value={address}
              onChange={(event) => setAddressValue(event.target.value)}
            />
            <button
              className="update-field-button"
              onClick={handleUpdateAddress}
            >
              Update Address
            </button>
          </div>

          {/* Phone Number input */}
          <div className="field-input-container">
            <input
              className="field-input"
              type="tel"
              placeholder={"Enter phone number"}
              value={phone}
              onChange={(event) => setPhoneValue(event.target.value)}
            />
            <button
              className="update-field-button"
              onClick={handleUpdatePhone}
            >
              Update Phone Number
            </button>
          </div>

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
                ? "Disconnect Google Account"
                : "Connect Google Account"}
            </button>
          </div>
          <div>
            <SignOutButton className="signout-button" />
          </div>
        </div>
      </div>
    );
};
