import { useMutation } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";

const registerUserFn = async (user) => {
  try {
    const response = await instance.post(ENDPOINTS.SIGNUP, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useRegisterUser = () => {
  const registerUserMutation = useMutation(async (user) => {
    const registerUser = await registerUserFn(user);
    return registerUser;
  });

  return { registerUserMutation, };
};
