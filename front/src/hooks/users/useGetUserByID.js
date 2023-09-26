import { useQuery } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";

const getUserQueryFn = async (id) => {
    try {
        const response = await instance.get(`${ENDPOINTS.USERS}/` + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGetUserByID = (id) => {
    const { status, data, error, refetch } = useQuery(
        ["user", id], // Unique query key to identify this query
        () => getUserQueryFn(id)
    );

    return {
        status,
        data,
        error,
        refetch,
    };
};

export default useGetUserByID;
