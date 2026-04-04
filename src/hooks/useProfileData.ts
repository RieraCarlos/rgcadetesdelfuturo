import { useState, useEffect, useCallback } from "react";
import supabase from "@/supabase/supabaseClient";

export interface IndicatorData {
    promedio_academico: number;
    asistencia_total: number;
    puntos_merito: number;
}

export interface PersonalProfile {
    fortalezas: string[];
    oportunidades: string[];
    debilidades: string[];
    amenazas: string[];
    sobre_mi: string;
    objetivos: string;
}

export interface Badge {
    id: string;
    name: string;
    icon_url: string;
    description: string;
}

export const useProfileData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [studentId, setStudentId] = useState<string | null>(null);
    const [profileName, setProfileName] = useState<string>("CADETE");
    const [rank, setRank] = useState<string>("Cadete");
    const [indicators, setIndicators] = useState<IndicatorData>({
        promedio_academico: 0,
        asistencia_total: 0,
        puntos_merito: 0
    });
    const [personalProfile, setPersonalProfile] = useState<PersonalProfile>({
        fortalezas: [],
        oportunidades: [],
        debilidades: [],
        amenazas: [],
        sobre_mi: "",
        objetivos: ""
    });
    const [badges, setBadges] = useState<Badge[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            let currentStudentId = null;
            let currentFullName = "";
            let currentAvatarUrl = null;

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id, full_name, role, avatar_url')
                    .eq('auth_id', user.id)
                    .single();
                
                if (profile) {
                    currentStudentId = profile.id;
                    currentFullName = profile.full_name;
                    currentAvatarUrl = profile.avatar_url;
                    setRank(profile.role === 'estudiante' ? 'Cadete' : profile.role);
                }
            } else {
                const storedProfile = localStorage.getItem('student_profile');
                if (storedProfile) {
                    const profile = JSON.parse(storedProfile);
                    currentStudentId = profile.id;
                    currentFullName = profile.full_name || "CADETE";
                    currentAvatarUrl = profile.avatar_url;
                }
            }

            if (currentStudentId) {
                setStudentId(currentStudentId);
                setProfileName(currentFullName);
                setAvatarUrl(currentAvatarUrl);

                // Fetch Indicators
                const { data: indData } = await supabase
                    .from('indicadores')
                    .select('promedio_academico, asistencia_total, puntos_merito')
                    .eq('student_id', currentStudentId)
                    .single();
                
                if (indData) setIndicators(indData);

                // Fetch Personal Profile (FODA)
                const { data: persData } = await supabase
                    .from('perfil_personal')
                    .select('*')
                    .eq('student_id', currentStudentId)
                    .single();
                
                if (persData) {
                    setPersonalProfile({
                        fortalezas: persData.fortalezas || [],
                        oportunidades: persData.oportunidades || [],
                        debilidades: persData.debilidades || [],
                        amenazas: persData.amenazas || [],
                        sobre_mi: persData.sobre_mi || "",
                        objetivos: persData.objetivos || ""
                    });
                }

                // Fetch Badges
                const { data: bData } = await supabase
                    .from('student_badges')
                    .select('badge:badges(*)')
                    .eq('student_id', currentStudentId);
                
                if (bData) {
                    setBadges(bData.map((item: any) => item.badge));
                }
            }
        } catch (err) {
            console.error("useProfileData: Error fetching data", err);
            setError("Error al cargar los datos del perfil.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updatePersonalProfile = async (updates: Partial<PersonalProfile>) => {
        if (!studentId) return;

        // Optimistic UI update
        const previousProfile = personalProfile;
        setPersonalProfile(prev => ({ ...prev, ...updates }));

        const { error: updateError } = await supabase
            .from('perfil_personal')
            .upsert(
                {
                    student_id: studentId,
                    ...updates,
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'student_id' }
            );

        if (updateError) {
            console.error("useProfileData: Error updating profile", updateError);
            setPersonalProfile(previousProfile); // Rollback
            throw updateError;
        }
    };

    return {
        loading,
        error,
        studentId,
        profileName,
        avatarUrl,
        rank,
        indicators,
        personalProfile,
        badges,
        updatePersonalProfile,
        refresh: fetchData
    };
};
