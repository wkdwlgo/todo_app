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

    //항목의 상태변경 수정(patch) 
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
      fetchTodosDetail: async(id:string): Promise<Todo_type> =>{
        const response = await axios.get(`${BASE_URL}/items/${id}`);
        return response.data;
      },



};



