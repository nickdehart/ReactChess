import classes from './Footer.module.css';
import github from '@/assets/github.svg';

export function Footer() {
    const year = new Date().getFullYear();
    const version = import.meta.env.VITE_GITHUB_REF_NAME && import.meta.env.VITE_GITHUB_SHA ?
        `${import.meta.env.VITE_GITHUB_REF_NAME}-v0.0.0-${import.meta.env.VITE_GITHUB_SHA.slice(0, 7)}` : "";
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
