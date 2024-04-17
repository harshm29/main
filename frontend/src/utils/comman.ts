import { toast } from "react-toastify";


export const showToast =(message:any)=> {
    return toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}

// calculate age
export const calculateAge =(dateOfBirth:any)=> {
    let dob:any = new Date(dateOfBirth); // Convert DOB to a Date object
    let currentDate:any = new Date(); // Get the current date
  
    let age:any = currentDate.getFullYear() - dob.getFullYear(); // Calculate the difference in years
  
    // Check if the current month is before the month of birth
    // or if it's the same month but the current day is before the day of birth
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    ) {
      age--; // Subtract 1 from the age if the birthdate hasn't occurred yet this year
    }
  
    return Number(age);
  }
  
  export function validateNRICNumber(nricInput:any) {
    // validation rules
  const nricRegex = /^[STFG]\d{7}[A-Z]$/i;
  return nricRegex.test(nricInput);
  }

  export function validatePhoneNumber(phoneNumber:string) {
  const nricRegex = /^\+65(6|8|9)\d{7}$/i;
  return nricRegex.test(phoneNumber); 
}
  

export const medicationData = {
    "category_id": "",
    "med_category": {
      "_id": "",
      "name": "",
      "slug": "",
      "createdAt": "",
      "updatedAt": "",
      "__v": 0
    },
    "medication": {
      "_id": "",
      "code": "",
      "name": "",
      "qty": 0,
      "cost_price": {
        "$numberDecimal": "0"
      },
      "unit_price": {
        "$numberDecimal": "0"
      },
      "drug_category": "",
      "dosage": "",
      "unit_quantity": "",
      "unit_description": "",
      "frequency": "",
      "dispensed_unit_price": 0,
      "precaution": "",
      "special_instruction": null,
      "stomachs": [],
      "createdAt": "",
      "updatedAt": "",
      "__v": 0
    },
    "isChecked": false
  }

export const getImageIdBasedOnName = (name: string) => {
  // Extract the desired string using regular expressions
  const regex = /(\d{8}_\d{6})/;
  const match = name?.match(regex);

  if (match && match[1]) {
    const extractedString = match[1];
    console.log(extractedString); // Output: 20230622_095944
    return `CRT${extractedString}`
  } else {
    console.log("String not found.");
    return '--'
  }
}

export const getTheFileName=(file:string)=> {
  // Split the URL by the '/' character
const urlParts = file?.split('/');

// Get the last part of the URL (the filename)
const filename = urlParts && urlParts[urlParts?.length - 1] || '--';

return filename;
}