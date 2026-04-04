import  supabase  from "@/supabase/supabaseClient";
//signup habilitar dependiendo el caso
import { type SignUpFormData } from "@/routes/pages/V2/loginAdmin_Inst/signup-form";

export const signup = async (req: SignUpFormData) => {
    try {
        const { data, error } = await supabase.auth.signUp({email: req.email, password: req.password});
        if(error || !data.user) throw new Error(error?.message || "Error con usuario");
        
        const roleStr = req.rol === "Admin" ? "admin" : "instructor";
        
        const {error: insertError} = await supabase
            .from('profiles')
            .insert([{
                auth_id: data.user.id, 
                full_name: req.name, 
                cedula: req.cedula, 
                zona: req.zona, 
                correo: req.email,
                role: roleStr
            }]);
        if(insertError) throw new Error(insertError.message);

        return "succesfully"
    } catch (error:any) {
        return {error: error.message || "Error con usuario"};
    }
}
//login, uso normal
import { type LoginFormData } from "@/routes/pages/V2/loginAdmin_Inst/login-form";
export const login = async (req: LoginFormData) => {
    const roleReq = (req.rol === "Admin") ? "admin" : 
                    (req.rol === "Instructor") ? "instructor" : "";
    try {
        //verificacion a inicio con el correo
        const {data, error} = await supabase.auth.signInWithPassword({email: req.email, password: req.password});
        if(error || !data.user) {return({error: error?.message})};
        //verificacion en bd
        console.log(data.user.id)
        const {data: datasUser, error: errorUser} = await supabase
            .from('profiles')
            .select('id, auth_id, role')
            .eq('auth_id', data.user.id)
            .eq('role', roleReq)
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