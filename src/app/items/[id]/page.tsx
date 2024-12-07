"use client"
import { use } from "react";
import { useState, useEffect } from "react";
import { Todo_type } from "../../../../lib/types/todo_type";
import { todoAPI } from "../../../../lib/api/todo";
import Image from "next/image";

type TodoDetailProps = {
  params: { id: string };
};

export default function Detail({ params }: TodoDetailProps) {
  const { id } = use(params);

  const [detail, setDetail] = useState<Todo_type>();
  
  useEffect(() => {
    const getDetail = async () => {
      try {
        const data= await todoAPI.fetchTodosDetail(id);
        setDetail(data);
      }catch(error){
        console.error("Failed to fetch detail:", error);
      }
    };
    getDetail();
  }, [id]); 


  return (
    <>
      {detail ? (
        <div className="pt-5 px-5 flex flex-col justify-center gap-3">
            <div className="detail_name_box px-10 py-3 flex justify-around border-solid border-2 border-black">
                <Image src={detail.isCompleted? "/Property1=Done.svg":"/Property1=Default.svg"} width={32} height={32} alt="isComplete icon"></Image>
                <p>{detail.name}</p>
            </div>
          
          <p>Memo: {detail.memo}</p>
          <p>Completed: {detail.isCompleted ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </>
  );
}
