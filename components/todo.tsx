import Image from "next/image"
import { Todo_type } from "../lib/types/todo_type"
import Link from "next/link";

type TodoProps = {
    todo: Todo_type;
    onComplete:(todo: Todo_type) =>(void)
  };




export default function Todo({todo, onComplete}: TodoProps){
    return(
        <div className="todo_div border-solid border-black border-2">
            <Link href={`/items/${todo.id}`} >
                <div className="todo_box flex py-2 items-center bg-white border-solid border-black border-2">
                    <button className="" onClick={(e)=> {
                        e.preventDefault();
                        onComplete(todo)
                        }}
                        >
                        <Image src={"/Property1=Default.svg"} width={32} height={32} alt="todo not check image" ></Image>
                    </button>
                    <p className="pl-5 todo_title">
                        {todo.name}
                    </p>
                </div>
            </Link>
        </div>
    )
}