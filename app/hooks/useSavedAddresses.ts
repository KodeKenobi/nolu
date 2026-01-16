import { useState, useEffect } from "react";
import { SavedAddress } from "../components/types";
import { STORAGE_KEYS } from "../constants";

export const useSavedAddresses = () => {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_ADDRESSES);
      let addresses: SavedAddress[] = [];

      if (saved) {
        try {
          addresses = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load saved addresses", e);
        }
      }

      fetch("/hardhat-addresses.json")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.warn("Failed to fetch hardhat-addresses.json:", res.status);
          return null;
        })
        .then((hardhatAccounts) => {
          if (
            hardhatAccounts &&
            Array.isArray(hardhatAccounts) &&
            hardhatAccounts.length > 0
          ) {
            const existingAddresses = new Set(
              addresses.map((a) => a.address.toLowerCase())
            );
            const newHardhatAccounts = hardhatAccounts.filter(
              (acc: { address: string }) =>
                !existingAddresses.has(acc.address.toLowerCase())
            );

            if (newHardhatAccounts.length > 0 || addresses.length > 0) {
              const merged = [...addresses, ...newHardhatAccounts];
              setSavedAddresses(merged);
              localStorage.setItem(
                STORAGE_KEYS.SAVED_ADDRESSES,
                JSON.stringify(merged)
              );
            } else if (hardhatAccounts.length > 0) {
              setSavedAddresses(hardhatAccounts);
              localStorage.setItem(
                STORAGE_KEYS.SAVED_ADDRESSES,
                JSON.stringify(hardhatAccounts)
              );
            } else {
              setSavedAddresses(addresses);
            }
          } else {
            if (addresses.length > 0) {
              setSavedAddresses(addresses);
            }
          }
        })
        .catch((error) => {
          console.warn("Error loading Hardhat addresses:", error);
          if (addresses.length > 0) {
            setSavedAddresses(addresses);
          }
        });
    }
  }, []);

  const saveAddress = (address: string, name: string) => {
    const newAddresses = [...savedAddresses, { address, name }];
    setSavedAddresses(newAddresses);
    localStorage.setItem(
      STORAGE_KEYS.SAVED_ADDRESSES,
      JSON.stringify(newAddresses)
    );
  };

  return { savedAddresses, setSavedAddresses, saveAddress };
};
