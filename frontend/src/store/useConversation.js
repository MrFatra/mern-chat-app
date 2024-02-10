import { create } from "zustand";

const useConversation = create((set) => ({
    selectedContact: null,
    setSelectedContact: (selectedContact) => set({ selectedContact }),
    messages: [],
    setMessages: (messages) => set({ messages })
}))

export default useConversation