import classes from './Footer.module.css';
import github from '@/assets/github.svg';

export function Footer() {
    const year = new Date().getFullYear();
    const version = import.meta.env.VITE_GIT_INFO ? `${import.meta.env.VITE_GIT_INFO} |` : '';
    return (
        <footer className={classes.footer}>
            <a href="https://github.com/nickdehart/ReactChess" target="_blank" className={classes.footerLink}>
                <span>&copy;</span> 
                {year} | Nicholas DeHart | {version}
                <img src={github} alt="Github Icon" className={classes.gitgubIcon} />
            </a>
        </footer>
    )
}
