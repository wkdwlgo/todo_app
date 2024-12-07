"use client";

import Image from "next/image";
import NoTodo from "../../components/no_todo";
import NoDone from "../../components/no_done"
import Todo from "../../components/todo";
import Done from "../../components/done";
import { todoAPI } from "../../lib/api/todo";
import { useEffect,useState } from "react";
import { Todo_type } from "../../lib/types/todo_type";

export default function Home() {

  const [todos, setTodos] = useState<Todo_type[]>([]);
  const [dones, setDones]=useState<Todo_type[]>([]);
  const [inputValue,setInputValue] = useState('');

  //todos 항목 get
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await todoAPI.fetchTodos();
        const { uncompleted, completed } = isDone(data);;
        setTodos(uncompleted);
        setDones(completed);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    getTodos();
  }, []);


  //api로 가져온 data를 dones와 todos로 나눠줄 함수 
  const isDone = (data: Todo_type[]) => {
    const uncompleted = data.filter((item) => !item.isCompleted); 
    const completed = data.filter((item) => item.isCompleted);   
    return { uncompleted, completed };
  };



  //input 필드 입력 받고 inputValue 상태 변경 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setInputValue(e.target.value);
  };

  //button 클릭 후 inputValue를 post 
  const addTodo =async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("할 일을 입력해주세요!");
      return;
    }
    try{
      const newTodo= await todoAPI.addTodo(inputValue);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }catch(error){
      console.error("할일 추가 실패:", error);
      alert("할 일을 추가하는 데 실패했습니다.");
    }
  };
  
  //상태 변경 함수 
  const handleComplete = async (todo: Todo_type) => {
    try {
      // `isCompleted` 상태 변경 데이터
      const updatedData = {
        isCompleted: !todo.isCompleted, // 상태를 완료로 변경
      };
      console.log(updatedData);
      // API 호출
      const updatedTodo = await todoAPI.updateCompleteTodo(todo.id.toString(), updatedData);
  
      // 상태 업데이트
    if (updatedTodo.isCompleted) {
      // 완료 상태로 변경된 경우
      setTodos((prev) => prev.filter((item) => item.id !== todo.id)); 
      setDones((prev) => [...prev, updatedTodo]); 
    } else {
      // 미완료 상태로 변경된 경우
      setDones((prev) => prev.filter((item) => item.id !== todo.id)); 
      setTodos((prev) => [...prev, updatedTodo]);
    }
  } catch (error) {
    console.error("Failed to update todo:", error);
  }
};

  return (
  <div className="pt-5 justify-center items-center px-5">
    <div className="flex justify-between  pb-4">
    <input type="text" placeholder="할 일을 입력해주세요" value={inputValue} onChange={handleChange} className="todo_input pl-5"/>
    <button onClick={addTodo}><Image src={todos.length > 0 || dones.length > 0 
        ? "/Type=Active,Size=Small.png"
        : "/Type=Add,Size=Small.png"} width={56} height={56} alt="todo add button"></Image></button>
    </div>
    <div>
      <div className="py-3">
        <Image src="/todo.svg" width={101} height={36} alt="todo image" className="pb-2"></Image>
        {todos.length==0? <NoTodo/>:
        <ul className="flex flex-col gap-3 pt-2">
         {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onComplete={handleComplete}/>
        ))}
        </ul>
         }
      </div>
      <div className="py-3">
        <Image src="/done.svg" width={101} height={36} alt="todo image" className="pb-2"></Image>
        {dones.length==0? <NoDone/>:
        <ul className="flex flex-col gap-3 pt-2">
        {dones.map((done) => (
         <Done key={done.id} done={done} onComplete={handleComplete}/>
       ))}
       </ul>
        }
      </div>
    </div>
  </div>
  );
}
