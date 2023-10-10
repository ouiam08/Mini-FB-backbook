import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchReactionQueryFn = async (postId, userId) => {
    try {
        const response = await instance.get(`${ENDPOINTS.REACTIONS}/${postId}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetPostUserReactions = (postId, userId) => {
    const {status, data, error, refetch} = useQuery({
        queryKey: ["fetchAllReactions", postId, userId],
        queryFn: () => fetchReactionQueryFn(postId, userId),
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        status,
        reactionList: data || [],
        error,
    };
};

export default useGetPostUserReactions;