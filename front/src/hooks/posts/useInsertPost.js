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
        async (post) => {
            const insertPost = await insertPostFn(post);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            return insertPost;
        }
    );

    return {insertPostMutation};
};

export default useInsertPost;