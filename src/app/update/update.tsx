"use client";

import React, { useState } from "react";
import { updateUserInfo } from "@/src/lib/auth/updateServerAction"; 

const UpdateUserInfo: React.FC = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDob] = useState("");
    const [addresse, setAddresse] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const userInfo = {
            name,
            surname,
            dob,
            addresse,
            phone,
        };

        try {
            await updateUserInfo(userInfo);
            alert("Informations de l'utilisateur mises à jour avec succès !");
        } catch (error) {
            // Check if the error has a message property
            const errorMessage = (error as Error).message || "Erreur lors de la mise à jour des informations de l'utilisateur.";
            console.error("Échec de la mise à jour des informations de l'utilisateur:", error);
            alert(errorMessage); // Display specific error message
        }
    };

    return (
        <div className="dashboard-page">
        <div className="dashboard-card">
            <h2>Modifier Vos Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="Date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Addresse"
                        value={addresse}
                        onChange={(e) => setAddresse(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="field-input"
                    />
                </div>
                <button type="submit" className="update-field-button">Modifier</button>
                
            </form>
            <a href="/dashboard">retour à Dashboard</a> 
        </div>
        </div>
    );
};

export default UpdateUserInfo;
