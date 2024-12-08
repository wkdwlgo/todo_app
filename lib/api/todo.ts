import axios from "axios";
import { Todo_type } from "../types/todo_type";
const BASE_URL="https://assignment-todolist-api.vercel.app/api/jisoleil";

export const todoAPI ={
    //항목 조회(get)
    fetchTodos:async(): Promise<Todo_type[]>=>{
        const response = await axios.get(`${BASE_URL}/items`);
        return response.data;
    },
    //새 항목 추가(post)
    addTodo: async(name:string):Promise<Todo_type> =>{
        const payload={name};
        const response = await axios.post(`${BASE_URL}/items`,payload);
        return response.data;
    },

    //항목 수정(patch) 
    updateCompleteTodo: async (
        itemId: string,
        updatedData: Partial<Todo_type>
      ): Promise<Todo_type> => {
        const response = await axios.patch(
          `${BASE_URL}/items/${itemId}`,
          updatedData
        );
        return response.data;
      },

      //항목 상세 조회(get)
      fetchTodosDetail: async (id: string): Promise<Todo_type> => {
        try {
          const response = await axios.get(`${BASE_URL}/items/${id}`);
          return response.data;
        } catch (error) {
          console.error("Failed to fetch todo detail:", error); // 에러 로그
          throw error; // 에러를 다시 던져서 호출부에서 처리
        }
      },

    // 사진 이미지 업로드(post)
    uploadImages: async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("image", file);
    
        try {
          const response = await axios.post(`${BASE_URL}/images/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          });
    
        return response.data?.url || null;
        } catch (error) {
            console.error("Failed to upload image:", error);
            return null;
        }
    },

    //항목 삭제
    deleteTodo: async(id: string): Promise<void> =>{
        await axios.delete(`${BASE_URL}/items/${id}`);
    }



};



