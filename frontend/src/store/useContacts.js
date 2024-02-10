import { create } from "zustand";

const useContacts = create((set) => ({
    contacts: [],
    setContacts: (contacts) => set({ contacts }),
}))

export default useContacts