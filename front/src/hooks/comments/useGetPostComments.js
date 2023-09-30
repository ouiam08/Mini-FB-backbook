import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchPostCommentsQueryFn = async (postId) => {
    try {
        const response = await instance.get(`${ENDPOINTS.COMMENTS}/post/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetPostComments = (postId) => {
    const {status, data, error, refetch} = useQuery({
        queryKey: ["fetchPostComments", postId],
        queryFn: () => fetchPostCommentsQueryFn(postId),
        refetchOnWindowFocus: true,
        enabled: typeof postId !== "undefined",
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        status,
        commentList: data || [],
        error,
    };
};

export default useGetPostComments;
