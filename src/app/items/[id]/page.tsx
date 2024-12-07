"use client"
import { use } from "react";
import { useState, useEffect } from "react";
import { Todo_type } from "../../../../lib/types/todo_type";
import { todoAPI } from "../../../../lib/api/todo";

type TodoDetailProps = {
  params: { id: string };
};

export default function Detail({ params }: TodoDetailProps) {
  // React.use()로 params.id를 감싸기
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
    <div>
      {detail ? (
        <>
          <h1>Todo Details</h1>
          <p>ID: {detail.id}</p>
          <p>Name: {detail.name}</p>
          <p>Memo: {detail.memo}</p>
          <p>Completed: {detail.isCompleted ? "Yes" : "No"}</p>
        </>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
}
