import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const updateUserFn = async (user) => {
    try {
        const response = await instance.put(ENDPOINTS.USERS, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useUpdateUser = () => {

    const queryClient = useQueryClient();

    const updateUserMutation = useMutation(
        ["UpdateUser"],
        async (user) => {
            const updateUser = await updateUserFn(user);
            queryClient.invalidateQueries(["user"])
            return updateUser;
        }
    );

    return {updateUserMutation};
};

export default useUpdateUser;