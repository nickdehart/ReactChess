import { Header } from '@/components/layout/Header';
import { Game } from '@/components/Game';
import { Footer } from '@/components/layout/Footer';
import { Store } from './store';
import './App.css';

export default function App() {
    return (
        <Store>
            <Header />
            <Game />
            <Footer />
        </Store>
    )
}
