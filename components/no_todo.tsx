import Image from "next/image"

export default function NoTodo(){
    return(
        <div className="flex flex-col justify-center items-center">
        <Image src="/Type=todo,Size=Small.svg" width={120} height={120} alt="notodo image" ></Image>
        <p>
        할 일이 없어요.<br />
        TODO를 새롭게 추가해주세요!
        </p>
        </div>
    )
}