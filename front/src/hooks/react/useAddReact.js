import {useMutation, useQueryClient} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const insertReactionFn = async (reaction) => {
    try {
        const response = await instance.post(ENDPOINTS.REACTIONS, reaction);
        return response.data;
    } catch (error) {
        throw error;
    }
};

function useAddReact() {

    const queryClient = useQueryClient();

    const insertReactionMutation = useMutation(
        ["InsertReaction"],
        async (reaction) => {
            const addReaction = await insertReactionFn(reaction);
            queryClient.invalidateQueries(["fetchAllReactions"]);
            queryClient.invalidateQueries(["fetchAllPosts"]);
            queryClient.invalidateQueries(["fetchAllPostsByUserID"]);
            return addReaction;
        }
    );

    return {insertReactionMutation};
}

export default useAddReact
