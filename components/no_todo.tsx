import Image from "next/image"

export default function NoTodo(){
    // todo 항목이 없을 때 보여주는 default 컴포넌트 
    return(
        <div className="flex flex-col justify-center items-center h-screen">
        <Image src="/Type=todo,Size=Small.svg" width={120} height={120} alt="notodo image" ></Image>
        <p className="text-center pt-4 ">
        할 일이 없어요.<br />
        TODO를 새롭게 추가해주세요!
        </p>
        </div>
    )
}