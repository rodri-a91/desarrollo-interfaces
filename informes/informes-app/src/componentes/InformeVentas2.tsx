import {
    BarChart, Bar, PieChart, Pie, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ventas from '../datos/ventas.json';
import type { Venta } from '../datos/tipos';

const datos = ventas as Venta[];

const formatoEuros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const COLORES = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const formatearTooltip = (valor: unknown) => (typeof valor === 'number' ? formatoEuros.format(valor) : '—');

function topProductos(lista: Venta[], cantidad: number) {
    const totales = new Map<string, number>();
    for (const v of lista) {
        totales.set(v.producto, (totales.get(v.producto) ?? 0) + v.importe * v.unidades);
    }
    return Array.from(totales, ([producto, total]) => ({ producto, total: Number(total.toFixed(2)) }))
        .sort((a, b) => b.total - a.total)
        .slice(0, cantidad);
}

function repartoPorCategoria(lista: Venta[]) {
    const totales = new Map<string, number>();
    for (const v of lista) {
        totales.set(v.categoria, (totales.get(v.categoria) ?? 0) + v.importe * v.unidades);
    }
    return Array.from(totales, ([categoria, total]) => ({ categoria, total: Number(total.toFixed(2)) }))
        .sort((a, b) => b.total - a.total)
        .map((item, i) => ({ ...item, fill: COLORES[i % COLORES.length] }));
}

function ventasPorMes(lista: Venta[]) {
    const totales = new Map<string, number>();
    for (const v of lista) {
        const mes = v.fecha.slice(0, 7);
        totales.set(mes, (totales.get(mes) ?? 0) + v.importe * v.unidades);
    }
    return Array.from(totales)
        .sort(([mesA], [mesB]) => mesA.localeCompare(mesB))
        .map(([mes, total]) => ({
            mes: MESES[Number(mes.slice(5, 7)) - 1],
            total: Number(total.toFixed(2)),
        }));
}

export default function TopProductos() {
    const top = topProductos(datos, 5);
    const reparto = repartoPorCategoria(datos);
    const evolucion = ventasPorMes(datos);

    return (
        <>
            <section>
                <h2>Top 5 productos por facturación</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={top} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="producto" width={170} />
                        <Tooltip formatter={formatearTooltip} />
                        <Bar dataKey="total" fill="#3b82f6" isAnimationActive={false} />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            <section>
                <h2>Reparto de la facturación por categoría</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={reparto}
                            dataKey="total"
                            nameKey="categoria"
                            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)} %`}
                            isAnimationActive={false}
                        />
                        <Tooltip formatter={formatearTooltip} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </section>

            <section>
                <h2>Evolución mensual de la facturación</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={evolucion}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip formatter={formatearTooltip} />
                        <Line type="monotone" dataKey="total" stroke="#3b82f6" isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </>
    );
}