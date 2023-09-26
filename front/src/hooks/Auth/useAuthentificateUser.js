import { useMutation } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";


const authUserFn = async (user) => {
  try {
    const response = await instance.post(ENDPOINTS.SIGNIN,user) ;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useAuthUser = () => {


    const authUserMutation = useMutation(
       (user) => {
           const authUser = authUserFn(user);
        return  authUser;
      }
    );

    return {  authUserMutation };
};

export default useAuthUser;