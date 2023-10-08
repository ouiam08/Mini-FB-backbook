import {useQuery} from "react-query";
import {ENDPOINTS} from "../../endpoints";
import {instance} from "../axios/useAxios";
import {useEffect} from "react";

const getUserQueryFn = async (id) => {
    try {
        const response = await instance.get(`${ENDPOINTS.USERS}/` + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetUserByID = (id) => {
    const {status, data, error, refetch} = useQuery(
        ["user", id], // Unique query key to identify this query
        () => getUserQueryFn(id)
    );
    useEffect(() => {
        refetch();
    }, [refetch]);


    return {
        status,
        user: data || [],
        error
    };
};

export default useGetUserByID;
