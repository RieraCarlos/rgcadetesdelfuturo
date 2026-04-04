import  supabase  from "@/supabase/supabaseClient.js";

export const loginEstudiante = async (cedulaId: string) => {
    const {data,error} = await supabase
        .from('profiles')
        .select('*')
        .eq('cedula', cedulaId)
        .eq('role', 'estudiante')
        .single();
    if(error){
        console.error('Error al autenticar el usuario:', error.message);
        return null;
    }
    console.log('Usuario autenticando:', data);
    return data;
};


