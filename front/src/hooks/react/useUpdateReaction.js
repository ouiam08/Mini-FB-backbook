import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";


const updateReactionFn = async (reaction) => {
    try {
        const response = await instance.put(ENDPOINTS.REACTIONS, reaction);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useUpdateReaction = () => {
    const queryClient = useQueryClient();

    const updateReactionMutation = useMutation(
        ["UpdateReaction"],
        async (reaction) => {
            const updateReaction = await updateReactionFn(reaction);
            queryClient.invalidateQueries(["fetchAllReactions"]);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            queryClient.invalidateQueries(["fetchAllPostsByUserID"]);
            return updateReaction;
        }
    );

    return {updateReactionMutation};
};

export default useUpdateReaction;