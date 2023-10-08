import {useEffect} from "react";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";

const fetchPostsByUserIdQueryFn = async (id) => {
    try {
        const response = await instance.get(`${ENDPOINTS.POSTS}/users/` + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetPostsByUserId = (id) => {
    const {status, data, error, refetch} = useQuery({
        queryKey: ["fetchAllPostsByUserID"],
        queryFn: () => fetchPostsByUserIdQueryFn(id),
        refetchOnWindowFocus: false


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
export default useGetPostsByUserId;