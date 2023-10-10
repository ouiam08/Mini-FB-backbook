import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const deleteReactionFn = async (reactionId) => {
    try {
        const response = await instance.delete(`${ENDPOINTS.REACTIONS}/${reactionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useDeleteReaction = () => {

    const queryClient = useQueryClient();

    const deleteReactionMutation = useMutation(
        ["deleteReaction"],
        async (reactionId) => {
            const deleteReaction = await deleteReactionFn(reactionId);
            queryClient.invalidateQueries(["fetchAllReactions"]);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            return deleteReaction;
        }
    );

    return {deleteReactionMutation};
};

export default useDeleteReaction;