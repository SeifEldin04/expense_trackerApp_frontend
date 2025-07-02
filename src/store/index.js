import { create } from 'zustand';

const useStore = create((set) => ({
    theme: localStorage.getItem('theme') ?? 'light',
    user: JSON.parse(localStorage.getItem('user')) ?? null,

    setTheme: (value) => {
        localStorage.setItem('theme', value); // Save the theme to localStorage

        document.documentElement.classList.toggle('dark', value === 'dark');
        set({ theme: value });
    },
    setUser: (newUser) => set({ user: newUser }),
    setCredentials: (user) => set({ user }),
    signOut: () => set({ user: null }),
}));

export default useStore;
