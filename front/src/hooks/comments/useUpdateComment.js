import { useMutation,useQueryClient } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";


const updateCommentFn = async (comment) => {
  try {
    const response = await instance.put(ENDPOINTS.COMMENTS,comment) ;
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const useUpdateComment = () => {

    const queryClient = useQueryClient();

    const updateCommentMutation = useMutation(
      ["UpdateComment"],
      async (comment) => {
        const updateComment = await updateCommentFn(comment);
        queryClient.invalidateQueries(["fetchAllComments"]);
        return updateComment;
      }
    );
  
    return {  updateCommentMutation };
};

export default useUpdateComment;