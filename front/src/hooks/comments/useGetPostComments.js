import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchPostCommentsQueryFn = async (postId) => {
    try {
        const response = await instance.get(`${ENDPOINTS.COMMENTS}/post/${postId}`);
        console.log("ana wst fetch ha id: ", postId);
        console.log("oha data ", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetPostComments = (postId) => {
    console.log("hnaaaaa: ", postId)
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
