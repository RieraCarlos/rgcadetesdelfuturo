import { cn } from "@/lib/utils"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useForm} from "react-hook-form"
import React, { use } from "react"
//Importando endpoint
import { signup } from "@/services/loginAdminIns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export type SignUpFormData ={
    email: string;
    password: string;
    name: string;
    cedula: string;
    zona: string;
    rol:string;
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const { register, handleSubmit, formState: {errors} } = useForm<SignUpFormData>();
    const [error, setError] = React.useState("");
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [notificacion, setNotificacion] = React.useState("");
    //location para el parametro
    const location = useLocation();
    const role = location.state?.role;
    const onSubmit = async (data: SignUpFormData) => {
        setError("");
        try {
            //llamado a la api
            const response = await signup(data);
            if(response === "succesfully"){
                setNotificacion("Ingreso correcto✅")
                setIsDialogOpen(true);
            }
            //navigate("/dashboard/admin");
            
        } catch (error: any) {
            setError(error.message);
        }   
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>  
                        <CardHeader>
                        <CardTitle className="text-2xl font-bold ">Cadetes del futuro</CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para iniciar sesión.
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Nombre completos:</Label>
                                    <Input
                                        type="text"
                                        placeholder="juanito perez"
                                        {...register("name", { required: "El nombre es requerido" })}
                                    />
                                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Cedula:</Label>
                                    <Input
                                    type="text"
                                    placeholder="2200113365"
                                    {...register("cedula", { required: "La cedula es requerida" })}
                                    />
                                    {errors.cedula && <span className="text-red-500">{errors.cedula.message}</span>}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Zona:</Label>
                                    <Input
                                    type="text"
                                    placeholder="Lago Agrio"
                                    {...register("zona", { required: "La zona es requerida" })}
                                    />
                                    {errors.zona && <span className="text-red-500">{errors.zona.message}</span>}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Rol:</Label>
                                    <Input
                                    type="text"
                                    value={role}
                                    {...register("rol", { required: "El rol es requerido" })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Correo:</Label>
                                    <Input
                                        type="email"
                                        placeholder="usuario@startgood.com"
                                        {...register("email", { required: "El correo es requerido" })}
                                    />
                                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Contraseña</Label>
                                    </div>
                                    <Input id="password" type="password" {...register("password", { required: "La contraseña es requerida" })} required />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                        Ingresar
                                    </Button>
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </form>
                        </CardContent>
                    </Card>
                </div>
                {/* Dialog de Previsualización */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="bg-white border-2 border-[#ffcc01] rounded-xl">
                    <DialogHeader>
                        <DialogTitle>Cadetes del futuro</DialogTitle>
                        <DialogDescription>
                            {notificacion}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end mt-6">
                        <Button onClick={() => setIsDialogOpen(false)}>
                            <Link to={"/dashboard/admin"}>Ir a dashboard</Link>
                        </Button>
                    </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
