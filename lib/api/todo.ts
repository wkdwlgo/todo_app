import axios from "axios";
import { Todo_type } from "../types/todo_type";
const BASE_URL="https://assignment-todolist-api.vercel.app/api/jisoleil";

export const todoAPI ={
    //todo 항목 가져오기
    fetchTodos:async(): Promise<Todo_type[]>=>{
        const response = await axios.get(`${BASE_URL}/items`);
        return response.data;
    },
    //새 todo 추가하기
    addTodo: async(name:string):Promise<Todo_type> =>{
        const payload={name};
        const response = await axios.post(`${BASE_URL}/items`,payload);
        return response.data;
    }

};



