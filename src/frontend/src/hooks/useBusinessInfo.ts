import { useState } from "react";

export interface BusinessInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const STORAGE_KEY = "dtech_business_info";

const DEFAULTS: BusinessInfo = {
  address:
    "D301, DB Lakven Visishta, Belathur Main Rd, Belathur, Krishnarajapuram, Bengaluru, Karnataka 560067",
  phone: "7411438800",
  email: "dhanush.dtechsolutions@gmail.com",
  hours: "Monday – Sunday: 11:00am – 8:00pm",
};

function loadInfo(): BusinessInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULTS, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return DEFAULTS;
}

export function useBusinessInfo() {
  const [info, setInfo] = useState<BusinessInfo>(loadInfo);

  const updateInfo = (next: BusinessInfo) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    setInfo(next);
  };

  return { info, updateInfo };
}
