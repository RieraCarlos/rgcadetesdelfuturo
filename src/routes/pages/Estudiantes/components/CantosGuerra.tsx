import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Music, BookOpen, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// --- SONG DATA ---

const CANTOS = [
  {
    id: '1',
    title: 'SI ME PREGUNTAN QUIÉN SOY',
    lyrics: `Si me preguntan quién soy, les diré que soy paraca,
nacido en cualquier cuartel, y formado en esta casa.
Jovencito junté mis ansias, como guambra bullanguero,
de ser un soldado valiente, convertirme en paraca primero.

Mi padre me dio unos sucres, y uno que otro consejo,
mi madre sus bendiciones, junto a caricias y besos.
Y así llegué a esta escuela, que me recibió muy temprano,
y comenzaron de pronto, con las pruebas de antemano.

Me bauticé con pechadas, me confirmé con carreras,
fui inscrito con flexiones, y aceptado a duras penas.
Mi lema fue la paciencia, la temeridad mi credo,
mi arrojo fue imperceptible, la vida me importó un bledo.

Comencé con las rodadas, por el suelo y de un camión,
los arrastres las paradas, de la torre cual avión.
El trote con nuestros gritos, el ñeque en todo momento,
esperando el día alegre, para lanzarnos al viento.

Cumplí mi primer deseo, el ala sobre mi pecho,
el amor a mi unidad, y el coraje de hombre hecho.
Mas todo no quedó ahí, mi meta era ser completo,
y en busca de ello avancé, con pundonor y respeto.

Oiga le cuento mi amigo, esto sí es cosa de hombres,
ser comando es muy difícil, hay que luchar para lograrlo,
como soldado es probado, en la dureza del hierro,
el cariño hacia la patria, a la unidad y a este suelo.

La lucha es consigo mismo, con el sueño y la abstinencia,
con el frío y la paciencia, con el calor y el desvelo.
Patrullas que van y vienen, trabajos que nunca acaban,
evasión ni escape tienen, sabor a guerra que espanta.

Y si toca morir un día, que sea en ese otro lado,
y cuando vean mi tumba, digan ahí yace un soldado,
llevando su vieja boina, y su uniforme adorado.
Él murió cuando mataba, duro, bravo y aleonado.

Cuando el ataúd le abran, que se me vea ahuesado,
mis botas bien charoladas, y mi boina de lado,
la calavera reída, con orgullo de soldado,
listo para retornar, a mi Ecuador adorado.

Y si preguntan quién soy, que digan que fui paraca,
nacido en cualquier cuartel, y formado en esta casa,
que viví, morí valiente, que viví y morí peleando,
que fui de mi patria sirviente, paracaidista y comando.`
  },
  {
    id: '2',
    title: 'PACHACÚTEC',
    lyrics: `En las selvas de mi patria,
donde el sol nace primero,
hay un grito que retumba,
es el grito del guerrero.

Pachacútec el indomable,
tu linaje es mi bandera,
con la lanza y el escudo,
defendemos la frontera.

Somos hijos del volcán,
somos sangre de la tierra,
en la paz somos hermanos,
y titanes en la guerra.

¡Pachacútec! ¡Adelante!
¡Pachacútec! ¡Venceremos!
Por la gloria de la patria,
nuestra vida entregaremos.`
  },
  {
    id: '3',
    title: 'ECUADOR PAÍS AMAZÓNICO',
    lyrics: `Ecuador país amazónico,
por derecho y tradición,
llevamos en nuestras venas,
el orgullo de la nación.

Por el Marañón al Este,
nuestro grito llegará,
ni un paso atrás diremos,
la victoria nuestra será.

En las fronteras de Oriente,
el soldado en su garita,
vigila con patriotismo,
nuestra tierra bendita.

¡Amazonas hoy y siempre!
Es la voz del corazón,
Ecuador unido y fuerte,
bajo una sola legión.`
  },
  {
    id: '4',
    title: 'HIMNO A LA INFANTERÍA',
    lyrics: `Paso de vencedores,
corazón de metal,
infante de mi patria,
guerrero sin igual.

En el campo de batalla,
tu presencia es el terror,
avanzando entre las balas,
con coraje y con valor.

Reina de las batallas,
arma de la decisión,
la infantería avanza,
cumpliendo su misión.

¡Paso! ¡Paso! ¡Vencedores!
Grita el alma con fervor,
infantería adelante,
por la gloria del Ecuador.`
  },
  {
    id: '5',
    title: 'HIMNO A LA CABALLERÍA',
    lyrics: `A caballo o en blindado,
la carga es tempestad,
caballeros de la patria,
ejemplo de lealtad.

El estruendo de los cascos,
o el rugir del motor,
anuncian la victoria,
con mística y honor.

En la pampa o en el monte,
tu lanza brillará,
caballería indomable,
nadie te detendrá.

¡Al paso! ¡Al trote! ¡Al galope!
¡Carga! ¡Carga! ¡Sin temor!
Caballería valiente,
orgullo del Ecuador.`
  },
  {
    id: '6',
    title: 'HIMNO A LA ARTILLERÍA',
    lyrics: `Trueno que rompe el cielo,
fuego en el horizonte,
artilleros de mi patria,
en el valle y en el monte.

Ubicamos el objetivo,
con precisión y destreza,
apoyo de fuego enviamos,
con gran delicadeza.

Tradición y tecnología,
unidas en la misión,
la artillería es el alma,
de toda gran acción.

¡Fuego! ¡Fuego! ¡Artilleros!
Que retumbe el cañón,
Santa Bárbara bendita,
guía nuestra munición.`
  },
  {
    id: '7',
    title: 'HIMNO A LA INGENIERÍA',
    lyrics: `Construimos el camino,
o el puente que haya que cruzar,
zapadores de mi patria,
siempre listos a luchar.

Abrimos paso a los nuestros,
sembrando la esperanza,
o detonamos el obstáculo,
que frena la balanza.

Mente, brazo y martillo,
en la paz y en el conflicto,
la ingeniería trabaja,
con un plan bien estricto.

¡Construir! ¡Destruir! ¡Vencer!
Es nuestro lema de honor,
ingeniería adelante,
sirviendo al Ecuador.`
  },
  {
    id: '8',
    title: 'HIMNO A LAS COMUNICACIONES',
    lyrics: `En las ondas del espacio,
nuestro mensaje volará,
comunicando la orden,
que la victoria traerá.

El enlace es la vida,
del mando en la batalla,
comunicantes alertas,
detrás de cada pantalla.

Voz, imagen y datos,
seguridad sin igual,
conectando a las armas,
en el campo operacional.

¡Comunicar para mandar!
¡Mandar para vencer!
Comunicaciones presentes,
cumpliendo su deber.`
  },
  {
    id: '9',
    title: 'MARCHA DE LA VICTORIA',
    lyrics: `Suenan clarines de guerra,
banderas al viento van,
avanzan los batallones,
con paso de huracán.

La patria nos llama al frente,
no hay tiempo para dudar,
vencer o morir juramos,
en el cielo, tierra o mar.

Victoria, victoria santa,
fruto del sacrificio,
el soldado ecuatoriano,
no conoce el prejuicio.

¡Viva el Ecuador glorioso!
¡Viva su fuerza y valor!
Marchamos hacia el futuro,
con mística y amor.`
  },
  {
    id: '10',
    title: 'LA CANCIÓN DE LOS COMANDOS',
    lyrics: `Rompiendo la selva enmarañada,
caminan los comandos sin cesar,
al caer la tarde, siempre alegres van,
al llegar la noche, ruge el alma de emoción.

Hijos de la soledad,
hermanos de la muerte son,
al pisar la tierra, tiembla de dolor.

No habrá nunca quien se atreva,
a detener tu caminar,
su grito de guerra, es como el huracán,
que asola montañas, valles a la vez.

Comandos, guerreros del aire,
comandos, señores del mar,
comandos, la patria te llama,
comandos, listos a luchar.

Si caigo en el campo de gloria,
mi boina me acompañará,
y en el cielo de los comandos,
mi alma descansará.`
  }
];

// --- MAIN COMPONENT ---

const CantosGuerra: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCantos = CANTOS.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
                        Cantos de Guerra
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">Librería de cultura institucional y mística militar.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="Buscar canto..." 
                        className="pl-10 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Icons / Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Cantos', value: CANTOS.length, icon: Music, color: 'text-orange-500' },
                    { label: 'Tradición', value: '100%', icon: Shield, color: 'text-blue-500' },
                    { label: 'Lectura', value: 'HD', icon: BookOpen, color: 'text-green-500' },
                    { label: 'Estado', value: 'Oficial', icon: ChevronRight, color: 'text-purple-500' },
                ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <s.icon className={`w-6 h-6 ${s.color}`} />
                        <div className="leading-none">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">{s.label}</p>
                            <p className="text-lg font-black">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid of Songs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCantos.length > 0 ? (
                    filteredCantos.map((canto) => (
                        <Dialog key={canto.id}>
                            <DialogTrigger asChild>
                                <Card className="group cursor-pointer bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-all overflow-hidden border-b-8">
                                    <CardHeader className="pb-2">
                                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center border-2 border-black mb-4 group-hover:bg-[#ffcc01] transition-colors">
                                            <Music className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl font-black uppercase leading-tight tracking-tighter">
                                            {canto.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground line-clamp-3 font-medium italic">
                                            "{canto.lyrics.split('\\n')[0]}..."
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex justify-end">
                                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase bg-black text-white px-2 py-1 rounded-full">
                                            <span>Ver Letra</span>
                                            <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0">
                                <div className="sticky top-0 bg-[#ffcc01] border-b-4 border-black p-6 z-10 flex items-center justify-between">
                                    <DialogHeader className="text-left">
                                        <DialogTitle className="text-2xl md:text-3xl font-black uppercase text-black italic">
                                            {canto.title}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <Shield className="w-8 h-8 text-black opacity-30" />
                                </div>
                                <div className="p-8 md:p-12">
                                    <pre className="whitespace-pre-wrap font-bold text-lg md:text-2xl text-black dark:text-white leading-relaxed tracking-tight font-serif drop-shadow-sm">
                                        {canto.lyrics}
                                    </pre>
                                </div>
                                <div className="p-6 border-t-2 border-black bg-zinc-50 dark:bg-zinc-800/50 flex justify-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        © Academia de Herencias Militares - Ecuador
                                    </p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-bold text-muted-foreground">No se encontraron cantos matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CantosGuerra;
