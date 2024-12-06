import Image from "next/image"
import { Todo_type } from "../lib/types/todo_type"
type TodoProps = {
    todo: Todo_type;
  };




export default function Todo({todo}: TodoProps){
    return(
        <div className="todo_box flex border border-black rounded-lg py-2 items-center">
            <button className="">
                <Image src={"/Property1=Default.svg"} width={32} height={32} alt="todo not check image" ></Image>
            </button>
            <p className="pl-5 todo_title">
                {todo.name}
            </p>
        </div>
    )
}