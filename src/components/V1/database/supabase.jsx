import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgegwdtgxaixopgdypea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnZWd3ZHRneGFpeG9wZ2R5cGVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzkxNjA2NCwiZXhwIjoyMDU5NDkyMDY0fQ.qaH4jARgM3fQpBmcK0rj7F5QFi_WQYQltd9ZCkk1uoc';
const supabase = createClient(supabaseUrl, supabaseKey);

export const authenticateUser = async (username, credencial) => {
    const {data,error} = await supabase
        .from('Usuarios')
        .select('*')
        .eq('name', username)
        .eq('credencial', credencial)
        .single();
    if(error){
        console.error('Error al autenticar el usuario:', error.message);
        return null;
    }

    return data;
};

export default supabase;

