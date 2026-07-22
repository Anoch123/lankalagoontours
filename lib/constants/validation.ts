export type TestRideFormValues = {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  bike: string;
  date: string;
  time: string;
  message: string;
};

export type TestRideValidationErrors = Partial<Record<keyof TestRideFormValues, string>>;

export const COUNTRY_CODES = [
  { value: "+93", label: "+93" },
  { value: "+355", label: "+355" },
  { value: "+213", label: "+213" },
  { value: "+1", label: "+1" },
  { value: "+61", label: "+61" },
  { value: "+91", label: "+91" },
  { value: "+94", label: "+94" },
  { value: "+44", label: "+44" },
  { value: "+49", label: "+49" },
  { value: "+33", label: "+33" },
  { value: "+971", label: "+971" },
  { value: "+65", label: "+65" },
];

export function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getMinimumAllowedTimeForToday() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function isTimeSelectionValid(selectedDate: string, selectedTime: string) {
  if (!selectedDate || !selectedTime) {
    return false;
  }

  if (selectedDate !== getTodayDateString()) {
    return true;
  }

  return selectedTime >= getMinimumAllowedTimeForToday();
}

export function validateTestRideForm(values: TestRideFormValues): TestRideValidationErrors {
  const errors: TestRideValidationErrors = {};

  const fullName = values.fullName.trim();
  if (!fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length < 2) {
    errors.fullName = "Please enter at least 2 characters.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = values.phone.trim();
  const countryCode = values.countryCode.trim();
  const phoneDigits = phone.replace(/\D/g, "");

  if (!countryCode) {
    errors.countryCode = "Please select a country code.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.bike.trim()) {
    errors.bike = "Please select your preferred bike.";
  }

  const selectedDate = values.date.trim();
  if (!selectedDate) {
    errors.date = "Please select a preferred date.";
  } else if (selectedDate < getTodayDateString()) {
    errors.date = "Please select today or a future date.";
  }

  const selectedTime = values.time.trim();
  if (!selectedTime) {
    errors.time = "Please select a preferred time.";
  } else if (!isTimeSelectionValid(selectedDate, selectedTime)) {
    errors.time = "Please select a time at least 1 hour ahead from the current time.";
  }

  return errors;
}

export function getPhoneNumberForSubmission(countryCode: string, phone: string) {
  const normalizedCountryCode = countryCode.trim();
  const normalizedPhone = phone.trim().replace(/\s+/g, "");

  if (!normalizedCountryCode) {
    return normalizedPhone;
  }

  return `${normalizedCountryCode}${normalizedPhone}`;
}
