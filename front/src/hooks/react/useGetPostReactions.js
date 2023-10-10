import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchReactionsQueryFn = async (postId) => {
    try {
        const response = await instance.get(`${ENDPOINTS.REACTIONS}/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetPostReactions = (postId) => {
    const {status, data, error, refetch} = useQuery({
        queryKey: ["fetchAllReactions", postId],
        queryFn: () => fetchReactionsQueryFn(postId),
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        status,
        reactList: data || [],
        error,
    };
};

export default useGetPostReactions;
