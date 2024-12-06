import Image from "next/image"
import { Todo_type } from "../lib/types/todo_type"

type DoneProps = {
    done: Todo_type;
  };

export default function Done({done}:DoneProps){
    return(
        <div className="todo_box flex border border-black py-2 items-center">
            <button>
                <Image src={"/Property1=Done.svg"} width={32} height={32} alt="todo check image" ></Image>
            </button>
            <p className="todo_title pl-3">
                {done.name}
            </p>
        </div>
    )
}