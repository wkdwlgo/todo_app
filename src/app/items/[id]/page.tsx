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
  
  const [name, setName]=useState('');
  const [img, setImg] = useState<string | null>(null); 
  const [memo, setMemo]=useState('');
  const [isCompleted, setIsCompleted]=useState(false);

  const [ showImages, setShowImages ] = useState<string[]>([]);

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

  useEffect(() => {
    if (detail) {
      setName(detail.name || "");
      setImg(detail.imageUrl || "");
      setMemo(detail.memo || "");
      setIsCompleted(detail.isCompleted || false);
    }
  }, [detail]); 

    //inputvalue(name, memo) 상태 변경 이벤트 핸들러
    const handleChange =
        (stateSetter: React.Dispatch<React.SetStateAction<any>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
        stateSetter(e.target.value);
    };

    // 상태 변경 이벤트 핸들러
    const handleComplete =()=>{
        setIsCompleted(!isCompleted);
    }

    // 파일 업로드 이벤트 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file= e.target.files?.[0];

        if(!file) return;

        const isEnglishName= /^[a-zA-Z0-9._-]+$/.test(file.name);
        if(!isEnglishName){
            alert("파일 이름은 영어로만 이루어져야 합니다.");
            return;
        }

        const maxSizeInBytes= 5*1024*1024;
        if(file.size>maxSizeInBytes){
            alert("파일 크기는 5MB 이하여야만 합니다.");
            return;
        }

        try{
            const uploadUrl = await todoAPI.uploadImages(file);
            if(uploadUrl){
                setImg(uploadUrl);
               
            }
        }catch(error){
            console.error("Failed to upload image", error);
            alert("이미지 업로드에 실패했습니다.")
        }
       
  };


  //항목 삭제 이벤트 핸들러 
  const handelDeleteDetail = async() =>{
    try{
        const deleteDetail = await todoAPI.deleteTodo(id.toString());
        alert("항목이 삭제되었습니다.");
        window.location.href = '/';

    }catch(error){
        console.log("Failed to delete detail", error);
    }
    
  };

  //항목 수정 이벤트 핸들러 
  const handleEditDetail = async() =>{
    try{
        const updatedData ={
            name: name,
            memo: memo,
            imageUrl: img ?? undefined,
            isCompleted: isCompleted
        }
        const editDetail= await todoAPI.updateCompleteTodo(id.toString(), updatedData);
        alert("항목이 수정되었습니다.");
        window.location.href = '/';

    } catch(error){
        console.log("Failed to edit detail", error);
    }
  };




  return (
    <>
      {detail ? (

        <div className="correction_box pt-5 px-5 pb-20 flex flex-col justify-center bg-white gap-3">
            <div className={`detail_name_box px-10 py-3 flex items-center justify-center border-solid border-2 border-black ${isCompleted? "bg-violet-100":""}`}>
                <button onClick={handleComplete}>
                <Image src={isCompleted? "/Property1=Done.svg":"/Property1=Default.svg"} width={32} height={32} alt="isComplete icon"></Image>
                </button>
                <input type="text" value={name} onChange={handleChange(setName)} className="correction_name_input pl-5"/>
            </div>
            
            <div className="file-upload-wrapper relative w-[100%] h-[311px] border-dashed border-2 border-slate-200 flex items-center justify-center bg-slate-100">
            <div
  className={`relative flex items-center justify-center ${
    img ? "w-full h-full" : "w-16 h-16"
  }`}
>
  <Image
    src={img || "/img.svg"}
    layout={img ? "fill" : "intrinsic"}
    width={img ? undefined : 64}
    height={img ? undefined : 64}
    className={img ? "object-cover" : ""}
    alt="uploaded image or placeholder"
  />
</div>
                    {/* 업로드 이미지를 클릭하면 input[type="file"] 트리거 */}
                <label htmlFor="file-input" className="custom-file-label">
                    <Image className="absolute bottom-3 right-3 " src={img?'/Type=Edit.svg':"/Type=Plus.svg"} width={64} height={64} alt="plus button img"/>
                </label>
                    
                    {/* 실제 파일 입력 필드 (화면에서 숨김 처리) */}
                <input 
                        id="file-input" 
                        type="file" 
                        accept="image/*" 
                        className="hidden-file-input" 
                        onChange={handleFileChange} 
                />
            </div>
                
            <div className="memo_box relative w-[100%] flex flex-col">
                <Image
                    src={"/memo.svg"}
                    alt="memo img"
                    layout="fill"
                    className="object-cover"
                />
                 <div className="memo_input_box absolute inset-0 flex flex-col justify-center items-center px-5">
                    <p className="text-amber-800 pb-2">Memo</p>
                    <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="correction_memo_input resize-none overflow-auto w-full h-[311px] max-h-[200px] p-2"
                    rows={3}
                    />
                </div>
            </div>
            
            <div className="gap-3 flex justify-center items-center pt-2">
                <button  onClick={handleEditDetail}>
                    <Image src={memo||img?'/Type=Edit,Size=Large,State=Active.png':'/Type=Edit,Size=Large,State=Default.png'} width={168} height={56} alt="not edit button img"/>
                </button>
                <button onClick={handelDeleteDetail}>
                    <Image src={'/Type=Delete,Size=Large,State=Default.png'} width={168} height={56} alt="delete button img"/>
                </button>
            </div>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </>
  );
}
