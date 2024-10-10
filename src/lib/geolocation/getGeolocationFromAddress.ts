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
      throw new Error("Failed to fetch geolocation from address API");
    }
  
    const data: GeolocationResponse = await response.json();
  
    
    if (data.features.length === 0) {
      throw new Error("Address not found");
    }
  
    const { geometry } = data.features[0];
    const [longitude, latitude] = geometry.coordinates;
    
    return { latitude, longitude };
  };
  