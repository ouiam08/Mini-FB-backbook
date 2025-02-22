import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const deletePostFn = async (postId) => {
    try {
        const response = await instance.delete(`${ENDPOINTS.POSTS}/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeletePost = () => {

    const queryClient = useQueryClient();

    const deletePostMutation = useMutation(
        ["deletePost"],
        async (postId) => {
            const deletedPost = await deletePostFn(postId);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            queryClient.invalidateQueries(["fetchAllPostsByUserID"]);
            return deletedPost;
        }
    );

    return {deletePostMutation};
};

export default useDeletePost;
