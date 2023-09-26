import { useMutation,useQueryClient } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";


const deleteCommentFn =  async(commentId) => {
  try {
    const response = await instance.delete(`${ENDPOINTS.COMMENTS}/${commentId}`) ;
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const useDeleteComment = () => {

    const queryClient = useQueryClient();

    const deleteCommentMutation = useMutation(
      ["deleteComment"],
       (commentId) => {
        const deletedComment =  deleteCommentFn(commentId);
        queryClient.invalidateQueries(["fetchAllComments"]);
        return deletedComment;
      }
    );
  
    return { deleteCommentMutation };
};

export default useDeleteComment;
