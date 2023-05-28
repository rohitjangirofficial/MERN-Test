import { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "../helpers/ApiUrl";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [authState, setAuthState] = useState({ loading: true, user: null });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${ApiUrl}/profile`, {
          withCredentials: true,
        });
        setAuthState({ loading: false, user: res.data.user });
      } catch (error) {
        setAuthState({ loading: false, user: null });
      }
    })();
  }, []);

  return authState;
};
