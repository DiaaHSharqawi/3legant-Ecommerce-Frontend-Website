import axios from "axios";
import React, { useEffect, useState } from "react";

function useProfile() {
  const [userProfile, setUserProfile] = useState([]);
  const [loader, setLoader] = useState(true);

  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_API_URL}/user/profile`;
  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(API_URL, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      if (data.message == "success") {
        setUserProfile(data.user);
      }
    } catch (error) {
      console.log(error);
      console.log(`error is : ${error}`);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return { userProfile, loader };
}

export default useProfile;
