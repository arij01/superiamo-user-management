"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";
import { getGeolocationFromAddress } from "@/src/lib/geolocation/getGeolocationFromAddress";
// calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in kilometers
}

// Helper function to convert degrees to radians
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}


export const updateUserInfo = async (userInfo: { 
  name: string; 
  surname: string; 
  dob: string; 
  addresse: string; 
  phone: string; 
}) => {
  
  const session = await auth();
  if (!session) {
    throw new Error("Non autorisé");
  }

  const uuid: string = session.user.id;

  // UUID validation
  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (!uuidRegExp.test(uuid)) {
    throw new Error("UUID invalide");
  }

  // Sanitize inputs
  const { name, surname, dob, addresse, phone } = userInfo;
  
  const sanitizedData = {
    name: name.trim(),
    surname: surname.trim(),
    dob: dob.trim(),
    addresse: addresse.trim(),
    phone: phone.trim(),
  };

  // Input validation
  if (!sanitizedData.name || !sanitizedData.surname || !sanitizedData.dob || !sanitizedData.addresse || !sanitizedData.phone) {
    throw new Error("Tous les champs doivent être remplis");
  }

  // phone number validation for France
  const phoneRegExp: RegExp = /^(?:0[1-9]|(\+33)[1-9])[0-9]{8}$/; 
  if (!phoneRegExp.test(sanitizedData.phone)) {
    throw new Error("Format de numéro de téléphone invalide");
  }
  const userCoordinates = await getGeolocationFromAddress(userInfo.addresse);

  // Paris coordinates
  const parisCoordinates = { latitude: 48.8566, longitude: 2.3522 };

  // Calculate the distance
  const distance = calculateDistance(
    parisCoordinates.latitude,
    parisCoordinates.longitude,
    userCoordinates.latitude,
    userCoordinates.longitude
  );

  // Address validation (within 50km from Paris)
  if (distance > 50) {
    throw new Error("L'adresse doit se trouver à moins de 50 km de Paris");
  }
  // Update user iquery
  const query = `
    UPDATE users 
    SET name = $1, surname = $2, dob = $3, addresse = $4, phone = $5 
    WHERE id = $6
  `;
  
  const values = [
    sanitizedData.name,
    sanitizedData.surname,
    sanitizedData.dob,
    sanitizedData.addresse,
    sanitizedData.phone,
    uuid,
  ];

  try {
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Échec de la mise à jour des informations de l'utilisateur");
  }
};
