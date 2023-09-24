import { useMutation,useQueryClient } from "react-query";
import { ENDPOINTS } from "../../endpoints";
import { instance } from "../axios/useAxios";


const insertCommentFn = async (comment) => {
  try {
    const response = await instance.post(ENDPOINTS.COMMENTS,comment) ;
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const useInsertComment = () => {

    const queryClient = useQueryClient();

    const insertCommentMutation = useMutation(
      ["InsertComment"],
       (comment) => {
        const insertComment =  insertCommentFn(comment);
        queryClient.invalidateQueries(["fetchAllComments"]);
        return insertComment;
      }
    );
  
    return { insertCommentMutation };
};

export default useInsertComment;