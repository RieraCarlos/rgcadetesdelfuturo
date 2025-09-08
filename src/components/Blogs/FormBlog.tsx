import {z} from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
//Componentes ui shadcn
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
//react-quill
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
//
import { useNavigate } from "react-router-dom"
import { useState } from "react"
//Schema
const formSchema = z.object({
    id: z.string(),
    titulo: z.string().min(2, {
        message: "El nombre no pueder ser de dos caracteres"
    }),
    contenido: z.string().min(10, {
        message: "El contenido debe tener al menos 10 caracteres"
    })
})

export function FormBlog(){
    const userId = localStorage.getItem("id") || '';
    const navigate = useNavigate();
    const [notification, setNotification] = useState(false);
    //1 Definiendo el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: userId,
            titulo: '',
            contenido: ''
        },
    })
    //2 Definiendo el submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/blog/submit", values);
            const resData = response.data;
            setNotification(true);
            console.log(resData);
        } catch (error) {
            console.error(error);
        } finally{
            setNotification(false);
            form.reset();
        }
    }

    return(
        <div className="flex flex-col gap-6 ">
            <Card className="bg-transparent shadow-accent border-none">
                <CardContent>
                    <Form {...form}  >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border-none ">
                            <FormField control={form.control} name="titulo" render={({field}) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel>Titulo:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field}/>
                                    </FormControl>
                                    <FormDescription  className="italic font-semibold text-gray-400 text-xs text-center">
                                        Deberas ingresar un titulo llamativo al publico.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="contenido" render={({field}) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel>Contenido</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            className=""
                                            theme="snow"
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Empieza a escribir tu blog aquí..."
                                        />
                                    </FormControl>
                                    <FormDescription className="italic font-semibold text-gray-400 text-xs text-center">
                                        Recuerda utilizar fuentes correctas.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <Button type="submit" >Submit</Button>
                        </form>
                        {notification && (
                            <h2 className="text-green-400 font-semibold text-center">Blog creado correctamente</h2>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
