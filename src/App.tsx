import { Header } from '@/components/Header';
import { Board } from '@/components/Board';
import { Footer } from '@/components/Footer';
import { Store } from './store';
import './App.css';

export default function App() {
    return (
        <Store>
            <Header />
            <Board />
            <Footer />
        </Store>
    )
}
