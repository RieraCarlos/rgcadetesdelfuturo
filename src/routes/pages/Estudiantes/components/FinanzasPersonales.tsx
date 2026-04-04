import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wallet, Landmark, PiggyBank, ArrowUpCircle, ArrowDownCircle, CircleDot, TrendingUp, CirclePlus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import supabase from '@/supabase/supabaseClient';

// --- TYPES ---

interface Transaction {
    id: string;
    student_id: string;
    amount: number;
    category: 'ingreso' | 'gasto' | 'ahorro';
    description: string;
    created_at: string;
}

interface FormData {
    description: string;
    amount: number;
    category: 'ingreso' | 'gasto' | 'ahorro';
}

// --- HELPER FUNCTIONS ---

const formatCurrency = (value: number) => {
    return value.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
};

const TransactionIcon = ({ type }: { type: string }) => {
    const styles = "w-6 h-6";
    switch (type) {
        case 'ingreso': return <ArrowUpCircle className={`${styles} text-green-500`} />;
        case 'gasto': return <ArrowDownCircle className={`${styles} text-red-500`} />;
        case 'ahorro': return <CircleDot className={`${styles} text-blue-500`} />;
        default: return null;
    }
};

// --- MAIN COMPONENT ---

const FinanzasPersonales: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'ingreso' | 'gasto' | 'ahorro'>('all');
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [studentId, setStudentId] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    // --- INITIAL FETCH ---
    useEffect(() => {
        const fetchUserAndData = async () => {
            setLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                let currentStudentId = null;

                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('id')
                        .eq('auth_id', user.id)
                        .single();
                    if (profile) currentStudentId = profile.id;
                } else {
                    // Fallback to localStorage if no active Supabase Auth session
                    const storedProfile = localStorage.getItem('student_profile');
                    if (storedProfile) {
                        const profile = JSON.parse(storedProfile);
                        currentStudentId = profile.id;
                    }
                }
                
                if (currentStudentId) {
                    setStudentId(currentStudentId);
                    const { data, error: fetchError } = await supabase
                        .from('student_finances')
                        .select('*')
                        .eq('student_id', currentStudentId)
                        .order('created_at', { ascending: false });
                    
                    if (fetchError) setError(fetchError.message);
                    else setTransactions(data || []);
                } else {
                    console.warn("FinanzasPersonales: No student ID found in Auth or LocalStorage.");
                }
            } catch (err) {
                console.error("FinanzasPersonales: Fatal error during initialization:", err);
                setError("Error al cargar la información del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndData();
    }, []);

    // --- DATA HANDLING ---
    const handleAddItem: SubmitHandler<FormData> = async (formData) => {
        console.log("FinanzasPersonales: Attempting to add item...", formData);
        if (!studentId) {
            console.error("FinanzasPersonales: Cannot add item, studentId is NULL.");
            setError("No se pudo identificar al usuario. Por favor, inicia sesión de nuevo.");
            return;
        }

        const newItem = {
            student_id: studentId,
            description: formData.description,
            amount: Number(formData.amount),
            category: formData.category,
        };
        
        console.log("FinanzasPersonales: Payload prepared:", newItem);

        // Optimistic UI update
        const tempId = Math.random().toString();
        const optimisticItem: Transaction = {
            ...newItem,
            id: tempId,
            created_at: new Date().toISOString(),
        };
        setTransactions(prev => [optimisticItem, ...prev]);
        setAddDialogOpen(false);
        reset();

        const { data, error: addError } = await supabase
            .from('student_finances')
            .insert([newItem])
            .select()
            .single();

        if (addError) {
            setError(addError.message);
            // Rollback optimistic update
            setTransactions(prev => prev.filter(t => t.id !== tempId));
        } else if (data) {
            // Replace temp item with real data
            setTransactions(prev => prev.map(t => t.id === tempId ? data : t));
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este registro?")) return;

        // Optimistic UI update
        const removedItem = transactions.find(t => t.id === id);
        setTransactions(prev => prev.filter(item => item.id !== id));

        const { error: deleteError } = await supabase
            .from('student_finances')
            .delete()
            .eq('id', id);

        if (deleteError) {
            setError(deleteError.message);
            // Rollback optimistic update
            if (removedItem) setTransactions(prev => [removedItem, ...prev]);
        }
    };

    // --- COMPUTED DATA ---
    const totals = useMemo(() => {
        return transactions.reduce((acc, t) => {
            if (t.category === 'ingreso') acc.ingresos += t.amount;
            else if (t.category === 'gasto') acc.gastos += t.amount;
            else if (t.category === 'ahorro') acc.ahorros += t.amount;
            return acc;
        }, { ingresos: 0, gastos: 0, ahorros: 0 });
    }, [transactions]);

    const totalCapital = totals.ingresos - totals.gastos;

    const chartData = useMemo(() => {
        // Group by date for the chart
        const grouped = transactions.reduce((acc: any, t) => {
            const date = new Date(t.created_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });
            if (!acc[date]) acc[date] = { name: date, Ingresos: 0, Gastos: 0 };
            if (t.category === 'ingreso') acc[date].Ingresos += t.amount;
            if (t.category === 'gasto') acc[date].Gastos += t.amount;
            return acc;
        }, {});
        return Object.values(grouped).reverse();
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        if (activeTab === 'all') return transactions;
        return transactions.filter(t => t.category === activeTab);
    }, [transactions, activeTab]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-center">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Capital Total */}
                    <Card className="bg-white dark:bg-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tu capital total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl md:text-5xl font-black">{formatCurrency(totalCapital)}</div>
                        </CardContent>
                    </Card>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { title: 'Ingresos', amount: totals.ingresos, color: 'text-green-500', icon: Wallet },
                            { title: 'Gastos', amount: totals.gastos, color: 'text-red-500', icon: Landmark },
                            { title: 'Ahorro', amount: totals.ahorros, color: 'text-blue-500', icon: PiggyBank },
                        ].map((m, i) => (
                            <Card key={i} className="bg-white dark:bg-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <CardContent className="pt-6 flex flex-col items-center">
                                    <m.icon className={`w-8 h-8 mb-2 ${m.color}`} />
                                    <span className="text-xs font-bold uppercase text-muted-foreground">{m.title}</span>
                                    <span className={`text-xl font-black ${m.color}`}>{formatCurrency(m.amount)}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Chart */}
                    <Card className="bg-white dark:bg-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-black uppercase tracking-tighter">Resumen de Movimientos</CardTitle>
                            <TrendingUp className="w-6 h-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="h-64 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
                                        <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid black' }} />
                                    <Area type="monotone" dataKey="Ingresos" stroke="#22c55e" fillOpacity={1} fill="url(#colorIngresos)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="Gastos" stroke="#ef4444" fillOpacity={1} fill="url(#colorGastos)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions Panel */}
                <div className="space-y-6">
                    <Card className="bg-white dark:bg-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-center mb-4">
                                <CardTitle className="font-black uppercase tracking-tighter">Transacciones</CardTitle>
                                <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-[#ffcc01] text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
                                            <CirclePlus className="w-4 h-4 mr-2" />
                                            Nuevo
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white dark:bg-zinc-900 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        <DialogHeader>
                                            <DialogTitle className="font-black uppercase text-2xl">Añadir Movimiento</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit(handleAddItem)} className="space-y-4 pt-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold uppercase">Descripción</label>
                                                <Input {...register("description", { required: true })} placeholder="Ej: Pago de cuota" className="border-2 border-black" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold uppercase">Monto ($)</label>
                                                <Input {...register("amount", { required: true, valueAsNumber: true })} type="number" step="0.01" className="border-2 border-black" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold uppercase">Categoría</label>
                                                <select {...register("category")} className="w-full p-2 border-2 border-black rounded-md bg-transparent font-bold">
                                                    <option value="ingreso">Ingreso</option>
                                                    <option value="gasto">Gasto</option>
                                                    <option value="ahorro">Ahorro</option>
                                                </select>
                                            </div>
                                            <DialogFooter className="pt-4">
                                                <Button type="submit" className="w-full bg-black text-[#ffcc01] font-bold py-6 text-lg hover:bg-zinc-800 transition-colors">
                                                    Guardar Transacción
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
                                <TabsList className="grid grid-cols-4 bg-zinc-100 dark:bg-zinc-800 p-1 border-2 border-black">
                                    <TabsTrigger value="all" className="text-[10px] font-bold uppercase">Todos</TabsTrigger>
                                    <TabsTrigger value="ingreso" className="text-[10px] font-bold uppercase">Ing</TabsTrigger>
                                    <TabsTrigger value="gasto" className="text-[10px] font-bold uppercase">Gst</TabsTrigger>
                                    <TabsTrigger value="ahorro" className="text-[10px] font-bold uppercase">Ah</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-y-auto max-h-[500px] scrollbar-hide px-4 pb-4">
                            <div className="space-y-3">
                                {filteredTransactions.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-12 font-medium">No hay registros aún.</p>
                                ) : (
                                    filteredTransactions.map(t => (
                                        <div key={t.id} className="flex items-center justify-between p-3 border-2 border-black rounded-xl bg-white dark:bg-zinc-800/50 group">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <TransactionIcon type={t.category} />
                                                <div className="truncate">
                                                    <p className="font-bold truncate text-sm">{t.description}</p>
                                                    <p className="text-[10px] text-muted-foreground">{new Date(t.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className={`font-black text-sm ${t.category === 'ingreso' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {t.category === 'ingreso' ? '+' : '-'}{formatCurrency(t.amount)}
                                                </span>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleDeleteItem(t.id)}
                                                    className="h-8 w-8 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FinanzasPersonales;
