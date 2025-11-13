import { useEffect, useState } from "react";
import supabase from "@/supabase/supabaseClient"; // Asegúrate que la ruta a tu cliente supabase sea correcta
import { useInView } from 'react-intersection-observer'
import {
  Heart,
  MessageSquare,
  Send,
  Bookmark,
  User
} from "lucide-react"

// Definimos un tipo para los blogs para mayor claridad y seguridad de tipos
type Blog = {
    id: string; // El ID de Supabase es un string (UUID)
    titulo: string;
    contenido: string; // El nombre de la columna en tu BD es 'contenido'
};

const BlogView = ({ titulo, contenido }: { titulo:string, contenido: string }) => {
    return (
        <div className="grid grid-cols-2 bg-gradient-to-t from-[#00212E] to-[#011b25] rounded-lg shadow-md mt-6">
            <div className="col-span-full flex h-15 items-center text-white font-bold w-full px-7">
                <User className="text-2xl mr-2" />
                <h2>Usuario</h2>
            </div>
            
            <div className="flex flex-col items-center">
                
                <hr />
                {/* Sección de Íconos */}
                <div className="flex justify-between items-center p-4">
                    <div className="flex space-x-4 text-white">
                        <Heart className="text-2xl cursor-pointer hover:text-red-500" />
                        <MessageSquare className="text-2xl cursor-pointer" />
                        <Send className="text-2xl cursor-pointer" />
                        <Bookmark className="text-2xl cursor-pointer" />

                    </div>
                </div>
            </div>
        
            <div className="flex flex-col justify-around">
                    {/* Sección de Título*/}
                    <div className="text-white font-bold text-lg px-4">
                        <div dangerouslySetInnerHTML={{ __html: titulo }} />
                    </div>
                    {/* Sección de Contenido */}
                    <div className="p-4 pt-2 text-sm text-white">
                        <div dangerouslySetInnerHTML={{ __html: contenido }} />
                        <p>
                            <span className="font-semibold">jotagepeme</span> Después de abandonar mi primera carrera (Economía)...
                            <span className="text-gray-500 cursor-pointer">más</span>
                            </p>
                            <p className="text-gray-500 mt-2">
                            Hace un día
                        </p>
                    </div>   
                    {/* Sección de Agregar Comentario */}
                    <div className="flex items-center p-4 ">
                        <input
                            type="text"
                            placeholder="Agrega un comentario..."
                            className="flex-1 p-2 text-sm text-gray-700 bg-gray-100 rounded-lg outline-none"
                        />
                    </div>
            </div>
            
        </div>
    );
};



const PAGE_SIZE = 5; // Cantidad de publicaciones a cargar por página

export default function BlogsComponents() {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState<Blog[]>([]);

    // Usa useInView para detectar cuando el "scroll sentinel" entra en la vista
    const { ref, inView } = useInView({
        threshold: 0, // Se activa en cuanto el elemento es visible
    });

    const fetchData = async () => {
        if (loading || !hasMore) return; // Evita llamadas duplicadas o innecesarias

        setLoading(true);
        try {
            const from = page * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            const { data: newData, error } = await supabase
                .from('blog') // Asegúrate que el nombre de tu tabla sea 'posts'
                .select('*')
                .order('created_at', { ascending: false }) // Ordena por fecha de creación
                .range(from, to);

            console.log(newData);    
            if (error) {
                throw error;
            }

            if (newData.length < PAGE_SIZE) {
                setHasMore(false); // No hay más datos
            } else {
                setData(prevData => [...prevData, ...newData]);
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setHasMore(false); // Detén la carga si hay un error
        } finally {
            setLoading(false); // Siempre desactiva el estado de carga
        }
    };
    
    // Llama a fetchData cuando el componente se monta y cuando `inView` es true
    useEffect(() => {
        if (inView) {
            fetchData();
        }
    }, [inView]); // Ahora solo depende de inView para disparar la carga

    return (
        <>
            <div className="bg-gradient-to-r from-[#00212E] to-[#011b25] mx-auto h-24 w-full max-w-4xl rounded-xl flex justify-center items-center">
                <h2 className="text-center items-center font-bold text-orange-500">rg technology <span className="text-white">- BlogPublicados</span></h2>
            </div>
            <div className="bg-trasnparent mx-auto h-full w-full max-w-4xl rounded-xl flex flex-col space-y-6 mt-6">
                {data.map((blog, index) => (
                    // La key debe ser un identificador único, como blog.id
                    <BlogView key={blog.id || index} titulo={blog.titulo} contenido={blog.contenido} />
                ))}
                
                {/* Elemento "sentinela" para detectar el scroll */}
                {hasMore && <div ref={ref} className="text-center py-4">{loading && "Cargando..."}</div>}
                
                {!hasMore && !loading && <div className="text-center py-4 text-orange-500">No hay más publicaciones.</div>}
            </div>
        </>
    );
}