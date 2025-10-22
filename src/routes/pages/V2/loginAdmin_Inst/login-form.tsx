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
import React from "react"
import { login } from "@/services/loginAdminIns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export type LoginFormData = {
  email: string
  password: string
  rol: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();
  const [error, setError] = React.useState("");
  const [notificacion, setNotificacion] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  //location para el parametro
  const location = useLocation();
  const role = location.state?.role;

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    try {
      //Llamada a la api
      const response = await login(data);
      console.log(response);
      if(response.success){
        setNotificacion("Ingreso correcto✅")
        setIsDialogOpen(true);
      }else{
        setError(response.error);
      }
    } catch (error:any) {
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
                    <Label htmlFor="email">Rol:</Label>
                    <Input
                      type="text"
                      value={role}
                      {...register("rol", {required: "El rol es requerido"})}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Correo:</Label>
                    <Input
                      type="email"
                      placeholder="usuario@startgood.com"
                      {...register("email", {required: "El correo es requerido"})}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Contraseña</Label>
                      {/*<a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>*/}
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      {...register("password", {required: "La contraseña es requerida"})} 
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Ingresar
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link 
                    to="/signup"
                    state={{role: role}}
                    className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* Dialog de Previsualización */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white border-t-4 border-b-4 border-l-4 border-r-2 border-[#ffcc01] rounded-xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold border-b-1 border-b-gray-950">Cadetes del futuro</DialogTitle>
                <DialogDescription className="text-base">
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
