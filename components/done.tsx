import Image from "next/image"
import { Todo_type } from "../lib/types/todo_type"
import Link from "next/link";

type DoneProps = {
    done: Todo_type;
    onComplete:(done: Todo_type) =>(void)
  };

export default function Done({done,onComplete}:DoneProps){
    return(
        <Link href={`/items/${done.id}`} >
            <div className="done_box todo_box flex border border-black py-2 items-center">
                <button className="" onClick={()=> onComplete(done)}>
                    <Image src={"/Property1=Done.svg"} width={32} height={32} alt="todo check image" ></Image>
                </button>
                <p className="done_title todo_title pl-3 ">
                    <del>{done.name}</del>
                </p>
            </div>
        </Link>
    )
}