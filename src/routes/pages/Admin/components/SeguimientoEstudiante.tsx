// src/components/StudentDashboard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Datos de ejemplo para la tabla de estudiantes
const studentsData = [
  {
    name: 'Estudiante 1',
    status: 'activo',
    pendingPayments: '200 USD',
    instructionAssistance: 5,
    representativePhone: '+593998765432',
    date: '2025-08-25'
  },
  {
    name: 'Estudiante 2',
    status: 'retirado',
    pendingPayments: '0 USD',
    instructionAssistance: 0,
    representativePhone: '+593998123456',
    date: '2025-08-24'
  },
  {
    name: 'Estudiante 3',
    status: 'activo',
    pendingPayments: '50 USD',
    instructionAssistance: 8,
    representativePhone: '+593998111222',
    date: '2025-08-23'
  },
  {
    name: 'Estudiante 4',
    status: 'activo',
    pendingPayments: '30 USD',
    instructionAssistance: 2,
    representativePhone: '+593998333444',
    date: '2025-08-22'
  },
];

type StudentStatus = 'activo' | 'retirado';

const SeguimientoEstudiantes: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const filteredStudents = studentsData.filter(student =>
    filterStatus === 'all' || student.status === filterStatus
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Sección de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
        <Card className=" border-gray-200 text-center">
          <CardHeader>
            <CardTitle>Estudiantes matriculados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">500</div>
          </CardContent>
        </Card>
        <Card className=" border-gray-200 text-center">
          <CardHeader>
            <CardTitle>Estudiantes retirado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">100</div>
          </CardContent>
        </Card>
        <Card className=" border-gray-200 text-center">
          <CardHeader>
            <CardTitle>Estudiante con pagos pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">350</div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de Filtros */}
      <div className="flex justify-end mb-6 md:mb-8">
        <Select onValueChange={handleFilterChange} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="retirado">Retirado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla de Estudiantes */}
      <div className="p-4 rounded-xl border-2 border-gray-200 overflow-x-auto">
        <Table className="w-full text-left table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="p-3 text-lg font-semibold">Nombre del estudiante</TableHead>
              <TableHead className="p-3 text-lg font-semibold">Estado</TableHead>
              <TableHead className="p-3 text-lg font-semibold hidden sm:table-cell">Pagos pendientes</TableHead>
              <TableHead className="p-3 text-lg font-semibold hidden md:table-cell">Asistencia en instrucción</TableHead>
              <TableHead className="p-3 text-lg font-semibold">Hablar con el representante</TableHead>
              <TableHead className="p-3 text-lg font-semibold hidden sm:table-cell">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student, index) => (
              <TableRow key={index} className="border-b border-gray-700 last:border-0">
                <TableCell className="p-3">{student.name}</TableCell>
                <TableCell className="p-3">
                  <span className={`
                    py-1 px-3 rounded-full text-sm font-semibold text-white
                    ${student.status === 'activo' ? 'bg-green-500' : 'bg-red-500'}
                  `}>
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="p-3 hidden sm:table-cell">{student.pendingPayments}</TableCell>
                <TableCell className="p-3 hidden md:table-cell">{student.instructionAssistance}</TableCell>
                <TableCell className="p-3">
                  <Button variant="link" className=" hover:text-green-700">
                    <a href={`https://wa.me/${student.representativePhone}`} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </TableCell>
                <TableCell className="p-3 hidden sm:table-cell">{student.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SeguimientoEstudiantes;