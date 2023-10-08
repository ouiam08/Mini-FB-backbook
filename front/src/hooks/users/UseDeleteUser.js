import {useMutation} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const deleteUserFn = async (userId) => {
    try {
        const response = await instance.delete(`${ENDPOINTS.USERS}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeleteUser = () => {


    const deleteUserMutation = useMutation(
        ["deleteUser"],
        async (postId) => {
            const deletedUser = await deleteUserFn(postId);
            return deletedUser;
        }
    );

    return {deleteUserMutation};
};

export default useDeleteUser;
