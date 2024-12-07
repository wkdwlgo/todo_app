import { use } from "react";
import { Todo_type } from "../../../../lib/types/todo_type";
import { todoAPI } from "../../../../lib/api/todo";

type TodoDetailProps ={
    params:{id:string};
};

export default async function Detail({params}:TodoDetailProps){
    const todo: Todo_type = await todoAPI.fetchTodosDetail(params.id);


    return(
        <div>
            <p>{todo.name}</p>
        </div>
    )
}