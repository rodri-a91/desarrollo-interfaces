import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ventas from '../datos/ventas.json';
import type { Venta } from '../datos/tipos';

const datos = ventas as Venta[];

function totalPorCategoria(lista: Venta[]) {
    const totales = new Map<string, number>();
    for (const v of lista) {
        totales.set(v.categoria, (totales.get(v.categoria) ?? 0) + v.importe * v.unidades);
    }
    return Array.from(totales, ([categoria, total]) => ({ categoria, total: Number(total.toFixed(2)) }));
}

function totalPorProducto(lista: Venta[]) {
    const totales = new Map<string, number>();
    for (const v of lista) {
        totales.set(v.producto, (totales.get(v.producto) ?? 0) + v.importe * v.unidades);
    }
    return Array.from(totales, ([producto, total]) => ({ producto, total: Number(total.toFixed(2)) }));
}

export default function InformeVentas() {
    const resumen = totalPorCategoria(datos);
    const resumenProducto = totalPorProducto(datos);

    return (
        <section>
            <h2>Ventas por categoría</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resumen}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" interval={0} />
                    <YAxis />
                    <Tooltip formatter={(valor: any) => `${valor.toFixed(2)} €`} />
                    <Bar dataKey="total" fill="#3b82f6" isAnimationActive={false} />
                </BarChart>
            </ResponsiveContainer>

            <h2>Ventas por producto</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resumenProducto}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="producto" interval={0} />
                    <YAxis />
                    <Tooltip formatter={(valor: any) => `${valor.toFixed(2)} €`} />
                    <Bar dataKey="total" fill="#3b82f6" isAnimationActive={false} />
                </BarChart>
            </ResponsiveContainer>
        </section>


    );
}