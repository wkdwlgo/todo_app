"use client";

import Image from "next/image";
import NoTodo from "../../components/no_todo";
import NoDone from "../../components/no_done";
import Todo from "../../components/todo";
import Done from "../../components/done";
import { todoAPI } from "../../lib/api/todo";
import { useEffect, useState } from "react";
import { Todo_type } from "../../lib/types/todo_type";

export default function Home() {
  const [todos, setTodos] = useState<Todo_type[]>([]);
  const [dones, setDones] = useState<Todo_type[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isDesk, setIsDesk] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // 768px 미만은 모바일
      setIsDesk(width >= 1024); // 1024px 이상은 데스크탑  
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //todos 항목 get
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await todoAPI.fetchTodos();
        const { uncompleted, completed } = isDone(data);
        setTodos(uncompleted);
        setDones(completed);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    getTodos();
  }, []);

  //항목 분리 (todo, done)
  const isDone = (data: Todo_type[]) => {
    const uncompleted = data.filter((item) => !item.isCompleted); 
    const completed = data.filter((item) => item.isCompleted);   
    return { uncompleted, completed };
  };

  //input 필드 입력 받고 inputValue 상태 변경 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //버튼 클릭 후 할일 추가 이벤트 리스너 
  const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("할 일을 입력해주세요!");
      return;
    }
    try {
      const newTodo = await todoAPI.addTodo(inputValue);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    } catch (error) {
      console.error("할일 추가 실패:", error);
      alert("할 일을 추가하는 데 실패했습니다.");
    }
  };

  // 엔터키 입력 후 할일 추가 이벤트 리스너 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(e as any); 
    }
  };

  //상태 변경 이벤트 핸들러 
  const handleComplete = async (todo: Todo_type) => {
    try {
      const updatedData = {
        isCompleted: !todo.isCompleted, 
      };
      console.log(updatedData);
      
      const updatedTodo = await todoAPI.updateCompleteTodo(todo.id.toString(), updatedData);
  
      // 상태 업데이트
      if (updatedTodo.isCompleted) {
        setTodos((prev) => prev.filter((item) => item.id !== todo.id)); 
        setDones((prev) => [...prev, updatedTodo]); 
      } else {
        setDones((prev) => prev.filter((item) => item.id !== todo.id)); 
        setTodos((prev) => [...prev, updatedTodo]);
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <div className="pt-5 justify-center items-center px-5">
      <div className="flex justify-between pb-4">
        <input
          type="text"
          placeholder="할 일을 입력해주세요"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="todo_input pl-5"
        />
        {isMobile ? (
          <button onClick={addTodo}>
            <Image
              src={
                todos.length > 0 || dones.length > 0
                  ? "/Type=Active,Size=Small.png"
                  : "/Type=Add,Size=Small.png"
              }
              width={56}
              height={56}
              alt="todo add button"
            />
          </button>
        ) : (
          <button onClick={addTodo}>
            <Image
              src={
                todos.length > 0 || dones.length > 0
                  ? "/Type=DefaultAdd,Size=Large.png"
                  : "/Type=Add,Size=Large.png"
              }
              width={168}
              height={56}
              alt="todo add button"
            />
          </button>
        )}
      </div>
      {isDesk ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="py-3">
            <Image src="/todo.svg" width={101} height={36} alt="todo image" className="pb-2" />
            {todos.length == 0 ? (
              <NoTodo />
            ) : (
              <ul className="flex flex-col gap-3 pt-2">
                {todos.map((todo) => (
                  <Todo key={todo.id} todo={todo} onComplete={handleComplete} />
                ))}
              </ul>
            )}
          </div>
          <div className="py-3">
            <Image src="/done.svg" width={101} height={36} alt="todo image" className="pb-2" />
            {dones.length == 0 ? (
              <NoDone />
            ) : (
              <ul className="flex flex-col gap-3 pt-2">
                {dones.map((done) => (
                  <Done key={done.id} done={done} onComplete={handleComplete} />
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="py-3">
            <Image src="/todo.svg" width={101} height={36} alt="todo image" className="pb-2" />
            {todos.length == 0 ? (
              <NoTodo />
            ) : (
              <ul className="flex flex-col gap-3 pt-2">
                {todos.map((todo) => (
                  <Todo key={todo.id} todo={todo} onComplete={handleComplete} />
                ))}
              </ul>
            )}
          </div>
          <div className="py-3">
            <Image src="/done.svg" width={101} height={36} alt="todo image" className="pb-2" />
            {dones.length == 0 ? (
              <NoDone />
            ) : (
              <ul className="flex flex-col gap-3 pt-2">
                {dones.map((done) => (
                  <Done key={done.id} done={done} onComplete={handleComplete} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
