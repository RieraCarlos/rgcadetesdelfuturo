import  supabase  from "@/supabase/supabaseClient";
//signup habilitar dependiendo el caso
import { type SignUpFormData } from "@/routes/pages/V2/loginAdmin_Inst/signup-form";

export const signup = async (req: SignUpFormData) => {
    try {
        const { data, error } = await supabase.auth.signUp({email: req.email, password: req.password});
        if(error || !data.user) throw new Error(error?.message || "Error con usuario");
        
        if(req.rol === "Admin"){
            const {error: insertError} = await supabase
                .from('administrativos')
                .insert([{id:data.user.id, nombres: req.name, cedula: req.cedula, zona: req.zona, correo: req.email}]);
            if(insertError) throw new Error(insertError.message);
        }
        return "succesfully"
    } catch (error:any) {
        return {error: error.message || "Error con usuario"};
    }
}
//login, uso normal
import { type LoginFormData } from "@/routes/pages/V2/loginAdmin_Inst/login-form";
export const login = async (req: LoginFormData) => {
    const nameBD = (req.rol === "Admin") ? "administrativos" : 
                    (req.rol === "Instructor") ? "instructores" : "";
    try {
        //verificacion a inicio con el correo
        const {data, error} = await supabase.auth.signInWithPassword({email: req.email, password: req.password});
        if(error || !data.user) {return({error: error?.message})};
        //verificacion en bd
        console.log(data.user.id)
        const {data: datasUser, error: errorUser} = await supabase
            .from(nameBD)
            .select('id')
            .eq('id', data.user.id)
            .maybeSingle();
        //
        if(errorUser || !datasUser) { return {error: errorUser?.message || "Usuario no registrado"}};

        return {
            success: true,
            user: datasUser,
        }
    } catch (error:any) {
        return { error: error.message}; 
    }

}