import supabase from '../../supabase/supabaseClient';

// --- TYPES ---

interface UserBetaProfile {
    id: string;
    name: string;
    avatar_id?: string;
}

interface AuthCredentials {
    name: string;
    password: string;
    avatarId?: string;
}

export type FinancialItem = {
    id?: string; // ID de la transacción, opcional al crear
    user_id: string; // ID del usuario
    name: string;
    valor: number;
    created_at?: string;
};

export type TableName = 'BetaGastos' | 'BetaIngresos' | 'BetaAhorro';


// --- AUTH FUNCTIONS ---

export async function loginBetaUser({ name, password }: AuthCredentials): Promise<{ user: UserBetaProfile | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('UserBeta')
            .select('id, name, avatar_id')
            .eq('name', name)
            .eq('password', password) // ⚠️ WARNING: Hash passwords in production!
            .single();

        if (error || !data) {
            return { user: null, error: "Nombre de usuario o contraseña incorrectos." };
        }
        
        return { user: data as UserBetaProfile, error: null };
    } catch (e: any) {
        return { user: null, error: e.message || "Error de conexión al intentar iniciar sesión." };
    }
}

export async function registerBetaUser({ name, password, avatarId }: AuthCredentials): Promise<{ user: UserBetaProfile | null, error: string | null }> {
    try {
        const { data: existingUser } = await supabase
            .from('UserBeta')
            .select('id')
            .eq('name', name)
            .maybeSingle();

        if (existingUser) {
            return { user: null, error: "Ese nombre de usuario ya está en uso." };
        }

        const { data, error } = await supabase
            .from('UserBeta')
            .insert({ name, password, avatar_id: avatarId })
            .select('id, name, avatar_id')
            .single();

        if (error || !data) {
             return { user: null, error: error?.message || "Error al crear el usuario." };
        }

        return { user: data as UserBetaProfile, error: null };
    } catch (e: any) {
        return { user: null, error: e.message || "Error desconocido al registrar." };
    }
}

export async function fetchBetaUsers(): Promise<{ users: UserBetaProfile[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('UserBeta')
      .select('id, name, avatar_id')
      .order('name', { ascending: true });

    if (error) return { users: [], error: error.message };
    return { users: (data as UserBetaProfile[]) ?? [], error: null };
  } catch (e: any) {
    return { users: [], error: e?.message ?? 'Error desconocido al obtener usuarios' };
  }
}


// --- FINANCIAL DATA FUNCTIONS ---

/**
 * Fetches financial items from a specified table for a given user.
 * @param tableName - The name of the table ('BetaGastos', 'BetaIngresos', 'BetaAhorro').
 * @param userId - The ID of the user whose items are to be fetched.
 * @returns A promise that resolves to the fetched items or an error.
 */
export async function fetchItems(tableName: TableName, userId: string): Promise<{ data: FinancialItem[] | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq('id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            return { data: null, error: `Error fetching from ${tableName}: ${error.message}` };
        }
        return { data, error: null };
    } catch (e: any) {
        return { data: null, error: `Exception fetching from ${tableName}: ${e.message}` };
    }
}

/**
 * Adds a new financial item to a specified table.
 * @param tableName - The name of the table.
 * @param itemData - The financial item to add (must include user_id, name, valor).
 * @returns A promise that resolves to the newly created item or an error.
 */
export async function addItem(tableName: TableName, itemData: Omit<FinancialItem, 'id' | 'created_at'>): Promise<{ data: FinancialItem | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .insert([itemData])
            .select()
            .single();
        
        if (error) {
            return { data: null, error: `Error adding to ${tableName}: ${error.message}` };
        }
        return { data, error: null };
    } catch (e: any) {
        return { data: null, error: `Exception adding to ${tableName}: ${e.message}` };
    }
}

/**
 * Deletes a financial item from a specified table by its ID.
 * @param tableName - The name of the table.
 * @param itemId - The ID of the item to delete.
 * @returns A promise that resolves to a success status or an error.
 */
export async function deleteItem(tableName: TableName, itemId: string): Promise<{ success: boolean, error: string | null }> {
    try {
        const { error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', itemId);

        if (error) {
            return { success: false, error: `Error deleting from ${tableName}: ${error.message}` };
        }
        return { success: true, error: null };
    } catch (e: any) {
        return { success: false, error: `Exception deleting from ${tableName}: ${e.message}` };
    }
}