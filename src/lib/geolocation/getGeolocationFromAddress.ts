interface GeolocationResponse {
    features: {
      geometry: {
        coordinates: [number, number]; // longitude, latitude
      };
    }[];
  }
  
  
  export const getGeolocationFromAddress = async (address: string) => {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Échec de la récupération de la géolocalisation à partir de l'API d'adresse");
    }
  
    const data: GeolocationResponse = await response.json();
  
    
    if (data.features.length === 0) {
      throw new Error("Adresse non trouvée");
    }
  
    const { geometry } = data.features[0];
    const [longitude, latitude] = geometry.coordinates;
    
    return { latitude, longitude };
  };
  