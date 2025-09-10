import { supabase } from '@/supabase/supabaseClient';

type datosTarea = {
    tema:string,
    actividad:string,
    recursos:string,
}

export const subirTarea = async (data: datosTarea) => {
    const result = await supabase
        .from('actividades')
        .insert([
            {
                tema: data.tema,
                actividad: data.actividad,
                recursos: [data.recursos],
                calificacion:0,
                estado:'pendiente'
            },
        ]);
    console.log('Usuario autenticando: ', data);
    return result;
}