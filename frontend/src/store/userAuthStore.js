import toast from 'react-hot-toast';
// import { data } from 'react-router-dom';
import { create } from 'zustand';
import { axiosInstance } from "../lib/axios.js"

// import toast from 'react-hot-toast';
// import { create } from 'zustand';


const useUserAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  checkAuth: async () => {
    // Implement checkAuth logic if needed
  },
  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));

export default useUserAuthStore;
