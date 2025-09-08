// src/components/Dashboard.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Importa el componente Shadcn Button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Importa los componentes de Card
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Importa Select
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Importa los componentes de Table
import { Input } from '@/components/ui/input'; // Importa el componente Input

// Datos de ejemplo para las transacciones
const paymentsData = [
  { studentName: 'Nombre 1', paymentType: 'Transferencia', transferNumber: '123456789', status: 'Pendiente' },
  { studentName: 'Nombre 2', paymentType: 'Depósito', transferNumber: '987654321', status: 'Facturado' },
  { studentName: 'Nombre 3', paymentType: 'Transferencia', transferNumber: '112233445', status: 'Pendiente' },
  { studentName: 'Nombre 4', paymentType: 'Transferencia', transferNumber: '112233445', status: 'Facturado' },
];

type PaymentStatus = 'Pendiente' | 'Facturado' | 'Cancelado';

const SeguimientoPagosEstudiante = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPayments = paymentsData.filter(payment =>
    filterStatus === 'all' || payment.status === filterStatus
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Contenido Principal */}
      <div className="flex-1 p-8">
        {/* Sección de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className='"@container/card"'>
            <CardHeader>
              <CardTitle className="text-lg">Estudiantes por cancelar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">438</div>
            </CardContent>
          </Card>
          <Card className='"@container/card"'>
            <CardHeader>
              <CardTitle className="text-lg">Recaudación en base al 70%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">17.7%</div>
            </CardContent>
          </Card>
          <Card className='"@container/card"'>
            <CardHeader>
              <CardTitle className="text-lg">Comprobantes por verificar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">400</div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Button className="w-full sm:w-auto">
            + Subir pago
          </Button>
          <Select onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Facturado">Facturado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabla de Pagos */}
        <Table className="border-2 border-gray-200 rounded-lg">
          <TableHeader className='bg-gray-200'>
            <TableRow>
              <TableHead className="hidden md:table-cell">Estudiante</TableHead>
              <TableHead>Tipo de pago</TableHead>
              <TableHead className="hidden sm:table-cell">No. Transf</TableHead>
              <TableHead className="hidden sm:table-cell">Comprobante</TableHead>
              <TableHead className="hidden sm:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Estado</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell className="hidden md:table-cell">{payment.studentName}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
                <TableCell className="hidden sm:table-cell">{payment.transferNumber}</TableCell>
                <TableCell className="hidden sm:table-cell">{payment.transferNumber}</TableCell>
                <TableCell className="hidden sm:table-cell">{payment.transferNumber}</TableCell>
                <TableCell className="text-right">
                  <span className={`
                    py-1 px-3 rounded-full text-sm font-semibold text-white
                    ${payment.status === 'Pendiente' ? 'bg-amber-400' : 'bg-green-500 text-green-900'}
                  `}>
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SeguimientoPagosEstudiante;