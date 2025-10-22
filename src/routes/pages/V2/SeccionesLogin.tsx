import {
    CircleUser,
    CircleUserRound,
    UserCheck
} from 'lucide-react'
import { Link } from 'react-router-dom';

export default function HomeLogin(){
    return (
        <div className="min-h-screen flex flex-col md:flex-row justify-evenly items-center text-white gap-8 md:gap-0">
            <Link to="/estudiante/login" className="w-[200px] h-[200px] border-2 border-white rounded-xl p-4 flex flex-col justify-center items-center text-center hover:bg-[#ffcc01] hover:text-black transition-colors duration-300 cursor-pointer">
                <CircleUser className="h-16 w-16 mb-4"/>
                <p className="text-lg font-semibold">Estudiante</p>
            </Link>  
            <Link 
                to="/login"
                state={{role: "Instructor"}}
                className="w-[200px] h-[200px] border-2 border-white rounded-xl p-4 flex flex-col justify-center items-center text-center hover:bg-[#ffcc01] hover:text-black transition-colors duration-300 cursor-pointer">
                <CircleUserRound className="h-16 w-16 mb-4"/>
                <p className="text-lg font-semibold">Instructor</p>
            </Link>
            <Link 
                to="/login"
                state= {{role: "Admin"}}
                className="w-[200px] h-[200px] border-2 border-white rounded-xl p-4 flex flex-col justify-center items-center text-center hover:bg-[#ffcc01] hover:text-black transition-colors duration-300 cursor-pointer">
                <UserCheck className="h-16 w-16 mb-4"/>
                <p className="text-lg font-semibold">Administrativo</p>
            </Link>
        </div>
    )
}