import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const updatePostFn = async (post) => {
    try {
        const response = await instance.put(ENDPOINTS.POSTS, post);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useUpdatePost = () => {

    const queryClient = useQueryClient();

    const updatePostMutation = useMutation(
        ["UpdatePost"],
        async (post) => {
            const updatePost = await updatePostFn(post);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            return updatePost;
        }
    );

    return {updatePostMutation};
};

export default useUpdatePost;