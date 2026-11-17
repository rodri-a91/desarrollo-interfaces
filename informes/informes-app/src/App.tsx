import './App.css';
import InformeVentas2 from './componentes/InformeVentas2';

export default function App() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Informe de ventas</h1>
      <InformeVentas2 />
    </main>
  );
}