import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const insertPostFn = async (post) => {
    try {
        const response = await instance.post(ENDPOINTS.POSTS, post);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useInsertPost = () => {

    const queryClient = useQueryClient();

    const insertPostMutation = useMutation(
        ["InsertPost"],
        (post) => {
            const insertPost = insertPostFn(post);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            return insertPost;
        }
    );

    return {insertPostMutation};
};

export default useInsertPost;