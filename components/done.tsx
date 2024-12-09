import Image from "next/image"
import { Todo_type } from "../lib/types/todo_type"
import Link from "next/link";

type DoneProps = {
    done: Todo_type;
    onComplete:(done: Todo_type) =>(void)
  };

export default function Done({done,onComplete}:DoneProps){
    return(
        <div className="todo_div border-solid border-black border-2">
            <Link href={`/items/${done.id}`} >
                <div className="todo_box flex py-2 items-center bg-violet-100">
                <button className="" onClick={(e)=> {
                        e.preventDefault();
                        onComplete(done)
                        }}
                        >
                        <Image src={"/Property1=Done.svg"} width={32} height={32} alt="todo check image" ></Image>
                    </button>
                    <p className="done_title todo_title pl-3 ">
                        <del>{done.name}</del>
                    </p>
                </div>
            </Link>
        </div>
    )
}