import { Header } from '@/components/Header';
import { Game } from '@/components/Game';
import { Footer } from '@/components/Footer';
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
