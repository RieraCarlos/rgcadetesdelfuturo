import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Wallet, Landmark, PiggyBank, ArrowUpCircle, ArrowDownCircle, CircleDot, TrendingUp, CirclePlus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addItem, deleteItem, fetchItems, FinancialItem, TableName } from './AuthBetaService';

// --- TYPES ---

interface User {
  id: string;
  name: string;
}

interface BetaFinanzasProps {
  user?: User; // User can be optional initially
}

type TransactionType = 'Gastos' | 'Ingresos' | 'Ahorro';

interface FormData {
    name: string;
    valor: number;
}

// --- HELPER FUNCTIONS & COMPONENTS ---

const formatCurrency = (value: number) => {
  return value.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });
};

const TransactionIcon = ({ type }: { type: TransactionType }) => {
  const styles = "w-6 h-6";
  switch (type) {
    case 'Ingresos': return <ArrowUpCircle className={`${styles} text-green-500`} />;
    case 'Gastos': return <ArrowDownCircle className={`${styles} text-red-500`} />;
    case 'Ahorro': return <CircleDot className={`${styles} text-blue-500`} />;
    default: return null;
  }
};

// --- MAIN COMPONENT ---

const BetaFinanzas: React.FC<BetaFinanzasProps> = ({ user }) => {
  console.log("BetaFinanzas: User prop received:", user);
  const [gastos, setGastos] = useState<FinancialItem[]>([]);
  const [ingresos, setIngresos] = useState<FinancialItem[]>([]);
  const [ahorros, setAhorros] = useState<FinancialItem[]>([]);
  const [loading, setLoading] = useState<Record<TableName, boolean>>({ BetaGastos: true, BetaIngresos: true, BetaAhorro: true });
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<TransactionType>('Gastos');
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [chartFilter, setChartFilter] = useState<'monthly' | 'weekly' | 'daily' | 'all'>('monthly');
  const isMobile = useIsMobile();
  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const tableMap: Record<TransactionType, TableName> = {
    Gastos: 'BetaGastos',
    Ingresos: 'BetaIngresos',
    Ahorro: 'BetaAhorro',
  };

  const stateMap: Record<TransactionType, React.Dispatch<React.SetStateAction<FinancialItem[]>>> = {
    Gastos: setGastos,
    Ingresos: setIngresos,
    Ahorro: setAhorros,
  };

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!user?.id) {
      console.log("BetaFinanzas: User ID not available, skipping data load.", user);
      return;
    }
    console.log("BetaFinanzas: User ID available, attempting to load data for user:", user.id);

    const loadAllData = async () => {
      setError(null);
      const tables: TableName[] = ['BetaGastos', 'BetaIngresos', 'BetaAhorro'];
      
      for (const table of tables) {
        setLoading(prev => ({ ...prev, [table]: true }));
        console.log(`BetaFinanzas: Fetching items for table: ${table} with user ID: ${user.id}`);
        const { data, error: fetchError } = await fetchItems(table, user.id);
        if (fetchError) {
          setError(fetchError);
          console.error(`BetaFinanzas: Error fetching ${table}:`, fetchError);
        } else if (data) {
          console.log(`BetaFinanzas: Successfully fetched ${table} data:`, data);
          const setter = stateMap[tabFromTable(table)];
          setter(data);
        }
        setLoading(prev => ({ ...prev, [table]: false }));
      }
    };

    loadAllData();
  }, [user]);

  // --- DATA HANDLING ---
  const handleAddItem: SubmitHandler<FormData> = async (formData) => {
    if (!user) return;
    const tableName = tableMap[activeTab];
    const newItem: Omit<FinancialItem, 'id' | 'created_at'> = {
      user_id: user.id,
      name: formData.name,
      valor: Number(formData.valor),
    };

    const { data, error: addError } = await addItem(tableName, newItem);
    if (addError) {
      setError(addError);
    } else if (data) {
      const setter = stateMap[activeTab];
      setter(prev => [data, ...prev]);
      reset();
      setAddDialogOpen(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este registro?")) return;

    const tableName = tableMap[activeTab];
    const { success, error: deleteError } = await deleteItem(tableName, id);
    if (deleteError) {
      setError(deleteError);
    } else if (success) {
      const setter = stateMap[activeTab];
      setter(prev => prev.filter(item => item.id !== id));
    }
  };

  // Helper functions for date manipulation
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  const formatDate = (date: Date, filter: 'monthly' | 'weekly' | 'daily' | 'all') => {
    switch (filter) {
      case 'monthly':
        return date.toLocaleString('es-EC', { month: 'short', year: 'numeric' });
      case 'weekly':
        const startOfWeek = getStartOfWeek(date);
        return `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1}`;
      case 'daily':
        return date.toLocaleString('es-EC', { day: '2-digit', month: '2-digit' });
      case 'all':
        return date.toLocaleString('es-EC', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      default:
        return date.toLocaleDateString();
    }
  };

  // --- COMPUTED DATA ---
  const totalIngresos = useMemo(() => ingresos.reduce((sum, item) => sum + item.valor, 0), [ingresos]);
  const totalGastos = useMemo(() => gastos.reduce((sum, item) => sum + item.valor, 0), [gastos]);
  const totalAhorros = useMemo(() => ahorros.reduce((sum, item) => sum + item.valor, 0), [ahorros]);
  const totalCapital = useMemo(() => totalIngresos - totalGastos, [totalIngresos, totalGastos]);

  const metrics: { title: string; amount: number; color: string; icon: React.ElementType }[] = [
    { title: 'Total Ingresos', amount: totalIngresos, color: 'text-green-400', icon: Wallet },
    { title: 'Total Gastos', amount: totalGastos, color: 'text-red-400', icon: Landmark },
    { title: 'Total Ahorro', amount: totalAhorros, color: 'text-blue-400', icon: PiggyBank },
  ];

  const chartData = useMemo(() => {
    const allTransactions = [...ingresos, ...gastos];
    allTransactions.sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());

    const aggregatedData: Record<string, { Ingresos: number; Gastos: number }> = {};

    allTransactions.forEach(t => {
      const date = new Date(t.created_at || 0);
      let key: string;

      switch (chartFilter) {
        case 'monthly':
          key = date.toLocaleString('es-EC', { month: 'short', year: 'numeric' });
          break;
        case 'weekly':
          const startOfWeek = getStartOfWeek(date);
          key = `${startOfWeek.getFullYear()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getDate()}`;
          break;
        case 'daily':
          key = date.toISOString().split('T')[0]; // YYYY-MM-DD
          break;
        case 'all':
          // For 'all', each transaction is a point, so the key needs to be unique per transaction
          // We'll handle this by pushing directly to an array later, not aggregating here
          key = t.id || date.toISOString(); // Fallback to date if no ID
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (chartFilter !== 'all') {
        if (!aggregatedData[key]) aggregatedData[key] = { Ingresos: 0, Gastos: 0 };

        if (ingresos.some(i => i.id === t.id)) {
          aggregatedData[key].Ingresos += t.valor;
        } else if (gastos.some(g => g.id === t.id)) {
          aggregatedData[key].Gastos += t.valor;
        }
      }
    });

    if (chartFilter === 'all') {
      return allTransactions.map(t => {
        const date = new Date(t.created_at || 0);
        return {
          name: formatDate(date, 'all'),
          Ingresos: ingresos.some(i => i.id === t.id) ? t.valor : 0,
          Gastos: gastos.some(g => g.id === t.id) ? t.valor : 0,
        };
      });
    }

    // Convert aggregated data to array and sort by date for proper chart display
    const sortedKeys = Object.keys(aggregatedData).sort((a, b) => {
      if (chartFilter === 'monthly') {
        // Parse month-year string for sorting
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA.getTime() - dateB.getTime();
      }
      return new Date(a).getTime() - new Date(b).getTime();
    });

    return sortedKeys.map(key => ({
      name: formatDate(new Date(key), chartFilter),
      ...aggregatedData[key],
    }));
  }, [ingresos, gastos, chartFilter]);

  const filteredTransactions = useMemo(() => {
    switch (activeTab) {
      case 'Gastos': return gastos;
      case 'Ingresos': return ingresos;
      case 'Ahorro': return ahorros;
      default: return [];
    }
  }, [activeTab, gastos, ingresos, ahorros]);

  const tabFromTable = (table: TableName): TransactionType => {
    if (table === 'BetaGastos') return 'Gastos';
    if (table === 'BetaIngresos') return 'Ingresos';
    return 'Ahorro';
  };

  // --- RENDER FUNCTIONS ---
  const renderMetrics = () => {
    const MetricCard = ({ metric }: { metric: { title: string; amount: number; color: string; icon: React.ElementType } }) => (
      <Card className="bg-neutral-900 border-neutral-800 text-center transition-transform transform hover:scale-105 duration-300">
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <metric.icon className={`w-8 h-8 mb-2 ${metric.color}`} />
          <h3 className="text-base font-medium text-neutral-400">{metric.title}</h3>
          <p className={`text-xl font-bold ${metric.color}`}>
            {formatCurrency(metric.amount)}
          </p>
        </CardContent>
      </Card>
    );

    if (isMobile) {
      return (
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {metrics.map((metric, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <MetricCard metric={metric} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
    );
  };
  
  const renderTransactions = () => {
    const isLoading = loading[tableMap[activeTab]];

    if (isLoading) {
        return <div className="flex justify-center items-center h-24"><Loader2 className="w-8 h-8 animate-spin text-neutral-500" /></div>;
    }
    
    if (isMobile) {
        return (
          <div className="space-y-3 px-2">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <Card key={transaction.id} className="bg-neutral-800/80 border-neutral-700 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TransactionIcon type={activeTab} />
                      <div>
                        <p className="font-medium text-white">{transaction.name}</p>
                        <p className="text-xs text-neutral-400">{new Date(transaction.created_at || 0).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className={`font-bold text-base ${activeTab === 'Ingresos' ? 'text-green-500' : activeTab === 'Gastos' ? 'text-red-500' : 'text-blue-500'}`}>
                            {formatCurrency(transaction.valor)}
                        </p>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-red-500" onClick={() => handleDeleteItem(transaction.id!)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="h-24 flex items-center justify-center text-center text-neutral-500">No hay transacciones de {activeTab}.</div>
            )}
          </div>
        );
      }

    return (
      <Table className="w-full">
        <TableHeader>
            <TableRow className="border-b-neutral-800 hover:bg-transparent">
                <TableHead className="p-4 font-semibold text-white">Detalle</TableHead>
                <TableHead className="p-4 font-semibold text-right text-white">Valor</TableHead>
                <TableHead className="w-[50px]"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition-colors duration-200 group">
                <TableCell className="p-4 font-medium flex items-center gap-3">
                  <TransactionIcon type={activeTab} />
                  <div>
                    <p>{transaction.name}</p>
                    <p className="text-xs text-neutral-400">{new Date(transaction.created_at || 0).toLocaleDateString()}</p>
                  </div>
                </TableCell>
                <TableCell className={`p-4 text-right font-bold ${activeTab === 'Ingresos' ? 'text-green-500' : activeTab === 'Gastos' ? 'text-red-500' : 'text-blue-500'}`}>
                  {formatCurrency(transaction.valor)}
                </TableCell>
                <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-600 group-hover:text-red-500 transition-colors" onClick={() => handleDeleteItem(transaction.id!)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow><TableCell colSpan={3} className="h-24 text-center text-neutral-500">No hay transacciones de {activeTab}.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  if (!user) {
    return (
        <div className="bg-neutral-950 rounded-2xl min-h-screen p-4 sm:p-6 md:p-8 text-white flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-neutral-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white">Cargando datos del usuario...</h2>
                <p className="text-neutral-400">Por favor, espera un momento.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-neutral-950 rounded-2xl min-h-screen p-4 sm:p-6 md:p-8 text-white">
        <div className="mx-auto max-w-7xl pt-25">
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-6 text-center">{error}</div>}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <Card className="bg-neutral-900 border-neutral-800 p-6">
                        <CardHeader className="p-0 mb-2 flex flex-row justify-between items-center">
                            <div>
                                <span className="text-base text-neutral-400">Tu capital total es:</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="text-4xl md:text-5xl font-extrabold text-white">{formatCurrency(totalCapital)}</div>
                        </CardContent>
                    </Card>

                    {renderMetrics()}

                    <Card className="bg-neutral-900 border-neutral-800 p-4 md:p-6">
                        <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-bold text-white">Resumen de Movimientos</CardTitle>
                            <div className="flex items-center gap-2">
                                <Tabs value={chartFilter} onValueChange={(value) => setChartFilter(value as 'monthly' | 'weekly' | 'daily' | 'all')}>
                                    <TabsList className="bg-neutral-800 h-auto p-1">
                                        <TabsTrigger value="monthly" className="text-xs data-[state=active]:bg-neutral-700 data-[state=active]:text-white transition-all duration-300">Mensual</TabsTrigger>
                                        <TabsTrigger value="weekly" className="text-xs data-[state=active]:bg-neutral-700 data-[state=active]:text-white transition-all duration-300">Semanal</TabsTrigger>
                                        <TabsTrigger value="daily" className="text-xs data-[state=active]:bg-neutral-700 data-[state=active]:text-white transition-all duration-300">Diario</TabsTrigger>
                                        <TabsTrigger value="all" className="text-xs data-[state=active]:bg-neutral-700 data-[state=active]:text-white transition-all duration-300">Individual</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <TrendingUp className="w-6 h-6 text-neutral-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#48BB78" stopOpacity={0.7} /><stop offset="95%" stopColor="#48BB78" stopOpacity={0} /></linearGradient>
                                        <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F56565" stopOpacity={0.7} /><stop offset="95%" stopColor="#F56565" stopOpacity={0} /></linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                                    <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
                                    <YAxis stroke="#a3a3a3" fontSize={12} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '0.5rem' }}
                                        formatter={(value: number) => [formatCurrency(value), 'Monto']}
                                        labelStyle={{ color: '#a3a3a3' }}
                                        labelFormatter={(label) => {
                                            if (chartFilter === 'all') {
                                                return `Fecha: ${label}`;
                                            }
                                            return `Periodo: ${label}`;
                                        }}
                                    />
                                    <Area type="monotone" dataKey="Ingresos" stroke="#48BB78" fillOpacity={1} fill="url(#colorIngresos)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="Gastos" stroke="#F56565" fillOpacity={1} fill="url(#colorGastos)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 flex flex-col">
                    <Card className="bg-neutral-900 border-neutral-800 h-full flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl font-bold text-white">Transacciones</CardTitle>
                                <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600"><CirclePlus className="w-4 h-4 mr-2" />Añadir</Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-neutral-900 border-neutral-700 text-white">
                                        <DialogHeader>
                                            <DialogTitle>Añadir Nuevo {activeTab.slice(0, -1)}</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit(handleAddItem)}>
                                            <div className="grid gap-4 py-4">
                                                <Input {...register("name", { required: "El nombre es obligatorio" })} placeholder="Nombre del movimiento" className="bg-neutral-800 border-neutral-700" />
                                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                                <Input {...register("valor", { required: "El valor es obligatorio", valueAsNumber: true })} type="number" step="0.01" placeholder="Valor (ej: 50.25)" className="bg-neutral-800 border-neutral-700" />
                                                {errors.valor && <p className="text-red-500 text-sm">{errors.valor.message}</p>}
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                                                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Guardar</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TransactionType)} className="mt-4">
                                <TabsList className="w-full bg-neutral-800 h-auto p-1 grid grid-cols-3">
                                    {['Gastos', 'Ingresos', 'Ahorro'].map((tab) => (
                                        <TabsTrigger key={tab} value={tab} className="text-sm data-[state=active]:bg-neutral-700 data-[state=active]:text-white transition-all duration-300">{tab}</TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent className="p-0 overflow-y-auto flex-grow">
                            {renderTransactions()}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BetaFinanzas;