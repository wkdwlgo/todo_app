import Image from "next/image"

export default function NoDone(){
    return(
        <div className="flex flex-col justify-center items-center h-screen">
        <Image src="/Type=Done,Size=Small.svg" width={120} height={120} alt="nodone image" ></Image>
        <p className="text-center pt-3">
        아직 다 한 일이 없어요.<br />
        해야 할 일을 체크해보세요!
        </p>
        </div>
    )
}