import axios from "axios";
import Cookies from "js-cookie";

export function getAuthorizationHeader() {
  const currentUser = Cookies.get("currentUser");

  return {
    authorization: `${JSON.parse(currentUser || "")?.accessToken || ""}`,
  };
}

export const searchPostalCode = async (postalCode: any) => {
  const API_KEY = "AIzaSyDcfWwG6YBWH6LxKLqT1SKslD-ZZJRLOok"; // Replace with your Google Geocoding API key
  const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${API_KEY}`;

  try {
    const response = await axios.get(API_URL);

    console.log("postal code address", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching postal code:", error);
    return null;
  }
};

// validate singapure postal code
export const isSingaporePostalCode = (postalCode: any) => {
  const postalCodePattern = /^[0-9]{6}$/; // Regular expression pattern for 6-digit numeric postal code

  return postalCodePattern.test(postalCode);
};

// validate stripe card
export const isValidStripeCardNumber = (cardNumber: any) => {
  // Remove any non-digit characters from the card number
  const cleanedCardNumber = cardNumber.replace(/\D/g, "");

  // Perform the Luhn algorithm validation
  let sum = 0;
  let isEvenDigit = false;
  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCardNumber.charAt(i), 10);
    if (isEvenDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEvenDigit = !isEvenDigit;
  }

  return sum % 10 === 0;
};
