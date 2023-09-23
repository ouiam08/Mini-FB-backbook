import { useMutation } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";


const authUserFn = async (user) => {
  try {
    const response = await instance.post(ENDPOINTS.SIGNIN,user) ;
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const useAuthUser = () => {


    const authUserMutation = useMutation(
       (user) => {
        return  authUserFn(user);     
      }
    );
  
    return {  authUserMutation };
};

export default useAuthUser;