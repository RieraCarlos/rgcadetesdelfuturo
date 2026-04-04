import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "@/supabase/supabaseClient";
import {
    ShieldCheck,
    Trophy,
    Target,
    Zap,
    AlertTriangle,
    TrendingUp,
    Clock,
    Award,
    Trash2,
    ArrowLeft,
    Calendar,
    User as UserIcon,
    Loader2,
    AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface PublicData {
    profile: {
        id: string;
        full_name: string;
        avatar_url: string;
        role: string;
    } | null;
    indicators: {
        promedio_academico: number;
        asistencia_total: number;
        puntos_merito: number;
    } | null;
    personalProfile: {
        fortalezas: string[];
        oportunidades: string[];
        debilidades: string[];
        amenazas: string[];
        sobre_mi: string;
        objetivos: string;
    } | null;
    badges: any[];
}

const PublicProfileFicha = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PublicData>({
        profile: null,
        indicators: null,
        personalProfile: null,
        badges: []
    });

    useEffect(() => {
        const fetchPublicData = async () => {
            if (!studentId) return;
            setLoading(true);
            try {
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                const isUUID = uuidRegex.test(studentId);

                const query = supabase
                    .from('profiles')
                    .select('id, full_name, avatar_url, role');
                
                if (isUUID) {
                    query.eq('id', studentId);
                } else {
                    query.eq('cedula', studentId);
                }

                const { data: profile, error: pErr } = await query.single();
                
                if (pErr || !profile) throw new Error("Cadete no encontrado.");

                const realUUID = profile.id;

                const { data: indicators } = await supabase
                    .from('indicadores')
                    .select('*')
                    .eq('student_id', realUUID)
                    .single();

                const { data: personal } = await supabase
                    .from('perfil_personal')
                    .select('*')
                    .eq('student_id', realUUID)
                    .single();

                const { data: badges } = await supabase
                    .from('student_badges')
                    .select('badge:badges(*)')
                    .eq('student_id', realUUID);

                setData({
                    profile,
                    indicators: indicators || null,
                    personalProfile: personal || null,
                    badges: badges?.map((b: any) => b.badge) || []
                });
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Error al cargar la ficha.");
            } finally {
                setLoading(false);
            }
        };

        fetchPublicData();
    }, [studentId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-8 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-[#202312]" />
                <p className="font-black uppercase tracking-widest text-[#202312] animate-pulse">Generando Ficha...</p>
            </div>
        );
    }

    if (error || !data.profile) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto space-y-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <AlertCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black uppercase text-[#202312]">Error de Acceso</h2>
                <p className="text-zinc-500 font-medium">El registro solicitado no existe o no tiene permisos de visualización pública.</p>
                <Button onClick={() => navigate("/")} className="w-full bg-[#202312] text-white font-bold h-12">
                    Volver al Inicio
                </Button>
            </div>
        );
    }

    const { profile, indicators, personalProfile, badges } = data;

    return (
        <div className="min-h-screen bg-[#fcfcfc] pb-20">
            {/* STICKY HEADER CONTROL */}
            <div className="sticky top-0 z-50 bg-[#202312] text-white px-4 py-4 flex items-center justify-between border-b-4 border-[#3b4125] shadow-lg">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#ffcc01]" />
                    <span className="text-sm font-black italic uppercase tracking-tighter">Ficha Certificada</span>
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="bg-[#fcfcfc] pt-8">
                <div className="max-w-4xl mx-auto md:p-6 space-y-8">
                    {/* 1. IDENTITY CARD */}
                    <div className="bg-white border-y-4 md:border-4 border-[#202312] md:rounded-[2.5rem] shadow-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center gap-6 p-8 md:p-12 text-center md:text-left">
                            <div className="relative">
                                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-[#3b4125] overflow-hidden shadow-2xl">
                                    <img
                                        src={profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=202312&color=ffcc01`}
                                        alt="Cadete"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#202312] text-white border-2 border-[#ffcc01] px-4 py-1 font-black uppercase text-xs">
                                    {profile.role === 'estudiante' ? 'CADETE' : profile.role}
                                </Badge>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nombre del Funcionario</span>
                                    <h1 className="text-3xl md:text-5xl font-black text-[#202312] uppercase italic leading-none tracking-tighter">
                                        {profile.full_name}
                                    </h1>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    {badges.length > 0 ? (
                                        <TooltipProvider>
                                            {badges.map((badge, i) => (
                                                <Tooltip key={i}>
                                                    <TooltipTrigger asChild>
                                                        <div className="group relative cursor-help">
                                                            <div className="w-14 h-14 bg-[#3b4125] rounded-xl flex items-center justify-center p-1.5 border-2 border-[#ffcc01]/40 shadow-lg hover:border-[#ffcc01] transition-all hover:scale-110 active:scale-95">
                                                                {badge.image_url || badge.icon_url ? (
                                                                    <img 
                                                                        src={badge.image_url || badge.icon_url} 
                                                                        alt={badge.name} 
                                                                        className="w-full h-full object-contain" 
                                                                    />
                                                                ) : (
                                                                    <Award className="text-[#ffcc01] w-8 h-8" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="bottom" className="bg-[#202312] border-2 border-[#ffcc01] text-white p-3 max-w-xs shadow-2xl">
                                                        <div className="space-y-1">
                                                            <p className="font-black uppercase text-[#ffcc01] text-xs italic tracking-tighter">{badge.name}</p>
                                                            {badge.description && (
                                                                <p className="text-[10px] font-bold text-zinc-300 leading-tight">
                                                                    {badge.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </TooltipProvider>
                                    ) : (
                                        <p className="text-xs font-bold text-zinc-400 italic">Sin condecoraciones registradas.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. PERFORMANCE KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
                        <Card className="border-4 border-[#202312] shadow-[8px_8px_0px_0px_#3b4125]">
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                    <TrendingUp className="w-4 h-4" /> Promedio
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="48" cy="48" r="40" className="stroke-zinc-100 fill-none" strokeWidth="8" />
                                        <circle
                                            cx="48" cy="48" r="40"
                                            className="stroke-[#3b4125] fill-none transition-all duration-1000"
                                            strokeWidth="8"
                                            strokeDasharray={251.2}
                                            strokeDashoffset={251.2 - (251.2 * (indicators?.promedio_academico || 0)) / 20}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute text-xl font-black">{indicators?.promedio_academico || 0}</span>
                                </div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Calificación / 20.0</span>
                            </CardContent>
                        </Card>

                        <Card className="border-4 border-[#202312] shadow-[8px_8px_0px_0px_#3b4125]">
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Clock className="w-4 h-4" /> Asistencia
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="text-4xl font-black text-[#202312]">{indicators?.asistencia_total || 0}%</div>
                                <Progress value={indicators?.asistencia_total || 0} className="h-3 border-2 border-black" indicatorClassName="bg-[#3b4125]" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Cumplimiento de Horario</span>
                            </CardContent>
                        </Card>

                        <Card className="border-4 border-[#202312] shadow-[8px_8px_0px_0px_#3b4125]">
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Trophy className="w-4 h-4" /> Méritos
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <div className="text-5xl font-black text-[#ffcc01] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    {indicators?.puntos_merito || 0}
                                </div>
                                <span className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tighter">Puntos Acumulados</span>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 3. STRATEGIC ANALYSIS (FODA) */}
                    <div className="px-4 md:px-0 space-y-6">
                        <div className="flex items-center gap-2 border-l-8 border-[#3b4125] pl-4">
                            <Zap className="w-6 h-6 text-[#202312]" />
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic text-[#202312]">Análisis de Desempeño (FODA)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { key: 'fortalezas', label: 'Fortalezas', icon: Zap, bg: 'bg-green-50' },
                                { key: 'oportunidades', label: 'Oportunidades', icon: Target, bg: 'bg-blue-50' },
                                { key: 'debilidades', label: 'Debilidades', icon: AlertTriangle, bg: 'bg-yellow-50' },
                                { key: 'amenazas', label: 'Amenazas', icon: Trash2, bg: 'bg-red-50' }
                            ].map((cat) => (
                                <div key={cat.key} className={`${cat.bg} border-2 border-[#202312] rounded-2xl p-4 space-y-2`}>
                                    <div className="flex items-center gap-2 text-[#202312] font-black uppercase text-xs italic">
                                        <cat.icon className="w-3 h-3" /> {cat.label}
                                    </div>
                                    <ul className="text-xs font-bold space-y-1">
                                        {(personalProfile?.[cat.key as keyof typeof personalProfile] as string[] || []).map((item: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#202312] rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                        {(!(personalProfile?.[cat.key as keyof typeof personalProfile] as string[]) || (personalProfile?.[cat.key as keyof typeof personalProfile] as string[])?.length === 0) && (
                                            <li className="text-zinc-400 italic">Información no disponible.</li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. MISSION & VISION */}
                    <div className="px-4 md:px-0 pb-12">
                        <Card className="border-4 border-[#202312] bg-[#202312] text-white">
                            <CardContent className="pt-8 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#ffcc01]">
                                        <UserIcon className="w-5 h-5" />
                                        <span className="font-black uppercase text-xs tracking-widest">Sobre el Cadete</span>
                                    </div>
                                    <p className="text-md font-medium leading-relaxed italic text-zinc-300">
                                        "{personalProfile?.sobre_mi || "No se ha registrado una biografía oficial para este perfil."}"
                                    </p>
                                </div>

                                <Separator className="bg-white/10" />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#ffcc01]">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-black uppercase text-xs tracking-widest">Misión y Visión Institucional</span>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="font-bold text-sm leading-relaxed text-white">
                                            {personalProfile?.objetivos || "El cadete aún no ha definido sus objetivos estratégicos."}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* WATERMARK FOOTER */}
                    <div className="py-12 flex flex-col items-center gap-4 opacity-20 pointer-events-none pb-20">
                        <div className="flex items-center gap-8">
                            <Separator className="w-20 bg-[#202312]" />
                            <ShieldCheck className="w-8 h-8 text-[#202312]" />
                            <Separator className="w-20 bg-[#202312]" />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#202312]">
                            Propiedad Intelectual de la Academia
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfileFicha;
