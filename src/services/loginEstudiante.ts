import { supabase } from "@/supabase/supabaseClient.js";

export const loginEstudiante = async (cedulaId: string) => {
    const {data,error} = await supabase
        .from('estudiantes')
        .select('*')
        .eq('cedula', cedulaId)
        .single();
    if(error){
        console.error('Error al autenticar el usuario:', error.message);
        return null;
    }
    console.log('Usuario autenticando:', data);
    return data;
};


