import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchCommentsQueryFn = async () => {
    try {
        const response = await instance.get(`${ENDPOINTS.COMMENTS}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetComments = () => {
    const {status, data, error, refetch} = useQuery({
        queryKey: ["fetchAllComments"],
        queryFn: () => fetchCommentsQueryFn(),
        refetchOnWindowFocus: true,
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

export default useGetComments;
