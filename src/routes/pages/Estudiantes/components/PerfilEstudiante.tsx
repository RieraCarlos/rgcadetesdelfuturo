import React, { useState } from "react";
import Soldado3 from "../../../../assets/img/Soldado3.avif";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Trophy, 
  Target, 
  User, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Award,
  Trash2,
  Pencil,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useProfileData, PersonalProfile } from "@/hooks/useProfileData";

// --- SUB-COMPONENTE PARA CADA TARJETA FODA ---
const FodaCard = ({ 
    category, 
    items, 
    onUpdate, 
    isSaving 
}: { 
    category: any, 
    items: string[], 
    onUpdate: (val: string[]) => Promise<void>,
    isSaving: boolean
}) => {
    const [editValue, setEditValue] = useState(items.join(", "));
    const [isOpen, setIsOpen] = useState(false);

    const safeItems = Array.isArray(items) ? items : [];

    const handleSave = async () => {
        const newItems = editValue
            .split(",")
            .map(i => i.trim())
            .filter(i => i !== "");
        await onUpdate(newItems);
        setIsOpen(false);
    };

    return (
        <div className={`${category.bg} ${category.border} border-2 rounded-2xl p-4 space-y-2 relative group`}>
            <div className="flex items-center justify-between font-black uppercase text-sm italic">
                <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    {category.title}
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pencil className="w-3 h-3" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="border-4 border-black">
                        <DialogHeader>
                            <DialogTitle className="font-black uppercase">Editar {category.title}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-xs font-bold mb-2 text-muted-foreground uppercase">Separa cada ítem con una coma</p>
                            <Textarea 
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="border-2 border-black min-h-[120px]"
                                placeholder="Liderazgo, Disciplina, etc..."
                            />
                        </div>
                        <DialogFooter>
                            <Button 
                                onClick={handleSave}
                                className="bg-black text-[#ffcc01] font-bold"
                                disabled={isSaving}
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar Cambios"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <ul className="text-xs font-bold space-y-1">
                {safeItems.length > 0 ? safeItems.map((item, j) => (
                    <li key={j} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                        {item}
                    </li>
                )) : (
                    <li className="text-muted-foreground italic font-medium">Pendiente de definir...</li>
                )}
            </ul>
        </div>
    );
};

// --- SUB-COMPONENTE PARA LA BIOGRAFÍA ---
const BioCard = ({ 
    profile, 
    onUpdate, 
    isSaving 
}: { 
    profile: PersonalProfile, 
    onUpdate: (sm: string, obj: string) => Promise<void>,
    isSaving: boolean
}) => {
    const [smValue, setSmValue] = useState(profile.sobre_mi || "");
    const [objValue, setObjValue] = useState(profile.objetivos || "");
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = async () => {
        await onUpdate(smValue, objValue);
        setIsOpen(false);
    };

    return (
        <Card className="bg-zinc-50 dark:bg-zinc-900 border-2 border-black border-dashed h-full relative group">
            <CardContent className="pt-6">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 border-2 border-black bg-white">
                                <Pencil className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="border-4 border-black max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="font-black uppercase">Editar Biografía y Objetivos</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase italic">Sobre Mí:</label>
                                    <Textarea 
                                        value={smValue}
                                        onChange={(e) => setSmValue(e.target.value)}
                                        className="border-2 border-black min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase italic">Misión / Objetivos:</label>
                                    <Textarea 
                                        value={objValue}
                                        onChange={(e) => setObjValue(e.target.value)}
                                        className="border-2 border-black min-h-[100px]"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button 
                                    onClick={handleSave}
                                    className="bg-black text-[#ffcc01] font-bold"
                                    disabled={isSaving}
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar Perfil"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                
                <p className="text-lg font-medium leading-relaxed italic text-zinc-600 dark:text-zinc-400">
                    "{profile.sobre_mi || "Sin descripción proporcionada. Haz clic en editar para añadir tu biografía."}"
                </p>
                
                <div className="mt-8 pt-8 border-t-2 border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-black uppercase text-muted-foreground mb-4">Misión Personal</p>
                    <div className="p-4 bg-white dark:bg-black rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,204,1,1)]">
                        <p className="font-bold text-sm">{profile.objetivos || "Define tus objetivos a largo plazo..."}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// --- COMPONENTE PRINCIPAL ---
const PerfilEstudiante = () => {
    const { 
        loading, 
        profileName, 
        rank, 
        indicators, 
        personalProfile, 
        badges, 
        avatarUrl,
        updatePersonalProfile 
    } = useProfileData();

    const [isSaving, setIsSaving] = useState(false);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-[#ffcc01]" />
                <p className="font-black uppercase tracking-widest animate-pulse">Cargando Hoja de Vida...</p>
            </div>
        );
    }

    const metrics = [
        { label: "Promedio Académico", value: Number(indicators.promedio_academico), max: 20, icon: TrendingUp, color: "bg-blue-500" },
        { label: "Asistencia Total", value: indicators.asistencia_total, max: 100, icon: Clock, color: "bg-green-500" },
        { label: "Puntos de Mérito", value: indicators.puntos_merito, max: 150, icon: Award, color: "bg-orange-500" },
    ];

    const fodaCategories = [
        { key: "fortalezas", title: "Fortalezas", bg: "bg-green-500/10", border: "border-green-500", icon: Zap },
        { key: "oportunidades", title: "Oportunidades", bg: "bg-blue-500/10", border: "border-blue-500", icon: Target },
        { key: "debilidades", title: "Debilidades", bg: "bg-yellow-500/10", border: "border-yellow-500", icon: AlertTriangle },
        { key: "amenazas", title: "Amenazas", bg: "bg-red-500/10", border: "border-red-500", icon: Trash2 },
    ];

    const handleUpdateFoda = async (field: keyof PersonalProfile, newItems: string[]) => {
        setIsSaving(true);
        try {
            await updatePersonalProfile({ [field]: newItems });
        } catch (err) {
            console.error("Error updating foda", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateBio = async (sm: string, obj: string) => {
        setIsSaving(true);
        try {
            await updatePersonalProfile({ sobre_mi: sm, objetivos: obj });
        } catch (err) {
            console.error("Error updating bio", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
            {/* 1. SECCIÓN DE IDENTIDAD */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative group">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-8 border-[#ffcc01] overflow-hidden shadow-xl transition-transform group-hover:scale-105">
                        <img 
                            src={avatarUrl || Soldado3} 
                            alt="Avatar" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileName)}&background=ffcc01&color=000000`;
                            }}
                        />
                    </div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-zinc-900 animate-pulse" title="Estado: Activo" />
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <BadgeUI className="bg-[#ffcc01] text-black border-2 border-black font-black uppercase mb-2">
                            {rank}
                        </BadgeUI>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                            {profileName}
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {badges.length > 0 ? (
                            <TooltipProvider>
                                {badges.map((badge) => (
                                    <Tooltip key={badge.id}>
                                        <TooltipTrigger asChild>
                                            <BadgeUI variant="outline" className="border-2 border-black font-bold cursor-help hover:bg-black hover:text-[#ffcc01] transition-colors">
                                                {badge.name}
                                            </BadgeUI>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-black border-2 border-[#ffcc01] text-white p-2 text-[10px] max-w-[200px]">
                                            <p className="font-black uppercase mb-1 text-[#ffcc01] tracking-tighter">{badge.name}</p>
                                            <p className="font-medium text-zinc-300 italic">{badge.description || "Condecoración oficial de la academia."}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </TooltipProvider>
                        ) : (
                            <div className="text-xs font-bold text-muted-foreground italic flex items-center gap-1 opacity-50">
                                <Trophy className="w-3 h-3" /> Sin insignias otorgadas
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. PANEL DE INDICADORES (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((metric, i) => (
                    <Card key={i} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                {metric.label}
                            </CardTitle>
                            <metric.icon className="w-4 h-4 text-[#ffcc01]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black mb-2">
                                {metric.value} <span className="text-sm text-muted-foreground">/ {metric.max}</span>
                            </div>
                            <Progress value={(metric.value / metric.max) * 100} className="h-3 border-2 border-black" indicatorClassName={metric.color} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 3. SECCIÓN PERSONAL (LAYOUT DE INGENIERÍA) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Columna Izquierda: Matriz FODA */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-[#ffcc01]" />
                        <h2 className="text-2xl font-black uppercase tracking-tighter italic">Análisis Estratégico (FODA)</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {fodaCategories.map((sq, i) => (
                            <FodaCard 
                                key={i}
                                category={sq}
                                items={personalProfile[sq.key as keyof PersonalProfile] as string[]}
                                onUpdate={(newItems) => handleUpdateFoda(sq.key as keyof PersonalProfile, newItems)}
                                isSaving={isSaving}
                            />
                        ))}
                    </div>
                </div>

                {/* Divisor Vertical para Escritorio */}
                <div className="hidden lg:block w-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Columna Derecha: Sobre Mí */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <User className="w-6 h-6 text-[#ffcc01]" />
                        <h2 className="text-2xl font-black uppercase tracking-tighter italic">Sobre Mí / Objetivos</h2>
                    </div>
                    <BioCard 
                        profile={personalProfile}
                        onUpdate={handleUpdateBio}
                        isSaving={isSaving}
                    />
                </div>
            </div>

            {/* Footer de Ficha */}
            <div className="pt-10 flex justify-center opacity-50">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    <span>Ficha técnica: {new Date().getFullYear()}</span>
                    <Separator orientation="vertical" className="h-4 bg-black" />
                    <span>Autenticidad Verificada</span>
                    <Separator orientation="vertical" className="h-4 bg-black" />
                    <span>Propiedad de la Academia</span>
                </div>
            </div>

            {/* Feedback flotante para guardado optimista */}
            {isSaving && (
                <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-black text-[#ffcc01] px-4 py-2 rounded-full border-2 border-white shadow-xl animate-bounce">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[10px] font-black uppercase">Sincronizando...</span>
                </div>
            )}
        </div>
    );
};

export default PerfilEstudiante;
 PerfilEstudiante;