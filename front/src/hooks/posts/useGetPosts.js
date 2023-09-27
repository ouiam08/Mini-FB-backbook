import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchPostsQueryFn = async () => {
    try {
        const response = await instance.get(`${ENDPOINTS.POSTS}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetPosts = () => {
    const {status, data, error, refetch} = useQuery({
        queryKey: ["fetchAllPosts"],
        queryFn: () => fetchPostsQueryFn(),
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        status,
        postList: data || [],
        error,
    };
};

export default useGetPosts;
