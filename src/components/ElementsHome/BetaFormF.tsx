import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchBetaUsers, loginBetaUser, registerBetaUser } from './AuthBetaService';
import { Separator } from '../ui/separator';

const AVATAR_OPTIONS = ['👤', '🤖', '🦊', '🦁', '🧑‍🚀', '🕵️'];

interface AuthFormProps {
  onAuthSuccess: (user: { id: string; name: string; avatar: string }) => void;
}

interface IAuthForm {
  name: string;
  password: string;
  avatarId: string;
}

interface StoredUser {
  id: string;
  name: string;
  avatar_id?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [view, setView] = useState<'list' | 'login' | 'register'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<IAuthForm>({
    defaultValues: { avatarId: AVATAR_OPTIONS[0] },
  });

  const selectedAvatarId = watch('avatarId');

  const loadUsers = async () => {
    try {
      const { users: fetched, error } = await fetchBetaUsers();
      if (error) {
        console.warn('fetchBetaUsers error:', error);
        setUsers([]);
        return;
      }
      setUsers(fetched);
    } catch (e) {
      console.error('Error cargando usuarios:', e);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (view === 'login' && selectedUser) {
      setValue('name', selectedUser.name);
      setValue('avatarId', selectedUser.avatar_id ?? AVATAR_OPTIONS[0]);
      setValue('password', '');
    } else if (view === 'register') {
      reset({ avatarId: AVATAR_OPTIONS[0], name: '', password: '' });
      setSelectedUser(null);
    } else if (view === 'list') {
        reset({ avatarId: AVATAR_OPTIONS[0], name: '', password: '' });
        setSelectedUser(null);
    }
  }, [view, selectedUser, setValue, reset]);

  const handleAction: SubmitHandler<IAuthForm> = async (data) => {
    setIsLoading(true);
    try {
      if (view === 'register') {
        const res = await registerBetaUser({ name: data.name, password: data.password, avatarId: data.avatarId });
        if (res.error) {
          alert(`Error: ${res.error}`);
        } else if (res.user) {
          onAuthSuccess({ id: res.user.id, name: res.user.name, avatar: res.user.avatar_id ?? data.avatarId ?? '👤' });
          await loadUsers();
          setView('list');
        }
      } else { // login
        const res = await loginBetaUser({ name: data.name, password: data.password });
        if (res.error) {
          alert(`Error: ${res.error}`);
        } else if (res.user) {
          onAuthSuccess({ id: res.user.id, name: res.user.name, avatar: res.user.avatar_id ?? '👤' });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = (user: StoredUser) => {
    setSelectedUser(user);
    setView('login');
  };

  const handleShowRegister = () => {
    setView('register');
  };

  const renderUserList = () => (
    <Card className="bg-[#171717] border-gray-700 text-white backdrop-blur-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Usuarios Registrados</CardTitle>
        <CardDescription className="text-center text-gray-400">Selecciona tu perfil para ingresar.</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2">
            {users.map(u => (
              <li
                key={u.id}
                className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-700/80 border border-transparent hover:border-[#8d8159]"
                onClick={() => handleSelectUser(u)}
              >
                <div className="text-4xl p-2 bg-gray-700 rounded-full">{u.avatar_id ?? '👤'}</div>
                <div className="text-white font-medium truncate w-full text-center">{u.name}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 py-4">No hay usuarios registrados.</p>
        )}
        <Separator className="my-6 bg-gray-700" />
        <div className="text-center">
            <p className="text-sm text-gray-300 mb-2">¿Tu nombre no aparece en la lista?</p>
            <Button onClick={handleShowRegister} className="w-full sm:w-auto bg-[#8d8159] hover:bg-[#8d8159] text-white">
                Regístrate Aquí
            </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderForm = () => (
    <Card className="bg-[#171717] border-gray-700 text-white backdrop-blur-sm w-full">
      <CardHeader>
        <Button variant="ghost" size="sm" className="absolute top-3 left-3 text-gray-400 hover:text-white" onClick={() => setView('list')}>
          &larr; Volver
        </Button>
        <CardTitle className="text-2xl text-center pt-8">
          {view === 'register' ? 'Registro Beta' : `Bienvenido, ${selectedUser?.name}`}
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
            {view === 'register' ? 'Crea tu cuenta para unirte a la beta.' : 'Ingresa tu contraseña para continuar.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleAction)} className="space-y-6">
          <Input
            placeholder="Nombre de usuario"
            {...register('name', { required: 'El nombre es requerido' })}
            className="bg-[#171717] border-gray-600 text-white placeholder:text-gray-400"
            disabled={view === 'login'}
          />
          {errors.name && <p className="text-red-500 text-sm -mt-4">{errors.name.message}</p>}

          <Input
            placeholder="Contraseña"
            type="password"
            {...register('password', { required: 'La contraseña es requerida' })}
            className="bg-[#171717] border-gray-600 text-white placeholder:text-gray-400"
          />
          {errors.password && <p className="text-red-500 text-sm -mt-4">{errors.password.message}</p>}

          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-3 text-center text-gray-300">Elige tu Avatar</label>
              <div className="flex justify-center gap-3 flex-wrap">
                {AVATAR_OPTIONS.map((icon) => (
                  <div
                    key={icon}
                    onClick={() => setValue('avatarId', icon, { shouldValidate: true })}
                    className={`text-4xl p-2 cursor-pointer rounded-full border-2 transition-all duration-200 ${selectedAvatarId === icon ? 'border-[#8d8159] ring-2 ring-[#8d8159] bg-gray-600' : 'border-gray-600 hover:border-gray-400'}`}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-[#8d8159] hover:bg-[#8d8159] text-lg py-6" disabled={isLoading}>
            {isLoading ? 'Cargando...' : view === 'register' ? 'Crear Cuenta' : 'Ingresar'}
          </Button>
        </form>
        <Separator className="my-6 bg-[#171717]" />
        <div className="text-center">
            <Button variant="link" className="text-gray-400 hover:text-orange-400" onClick={() => setView(view === 'login' ? 'register' : 'login')} disabled={isLoading}>
                {view === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`w-full ${view !== 'list' ? 'hidden md:block' : 'block'}`}>
                {renderUserList()}
            </div>
            <div className={`w-full ${view === 'list' ? 'hidden md:block' : 'block'}`}>
                {view === 'list' 
                    ? (
                        <div className="h-full flex flex-col items-center justify-center rounded-lg bg-[#171717] border-2 border-dashed border-gray-700 p-8 text-center">
                            <h3 className="text-xl font-semibold text-white">Bienvenido al Acceso Beta</h3>
                            <p className="text-gray-400 mt-2">Por favor, selecciona tu usuario de la lista o regístrate para obtener acceso a las nuevas funcionalidades.</p>
                        </div>
                    )
                    : renderForm()
                }
            </div>
        </div>
    </div>
  );
};

export default AuthForm;