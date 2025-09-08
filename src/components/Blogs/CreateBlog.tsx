import { FormBlog } from "./FormBlog"

export default function CreateBlog(){
    return (
        <>
            <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl flex justify-center items-center">
                <h2 className="text-center items-center font-bold">rg technology - Crear un blog</h2>
            </div>
            <div className="bg-muted/50 mx-auto h-auto w-full max-w-3xl rounded-xl ">
                <FormBlog/>
            </div>
        </>        
    )
}