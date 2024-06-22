import classes from './Footer.module.css';
import github from '@/assets/github.svg';

export function Footer() {
    const year = new Date().getFullYear();
    const version = import.meta.env.VITE_GIT_INFO ? `${import.meta.env.VITE_GIT_INFO} |` : '';
    const version_backup = `${import.meta.env.VITE_GITHUB_REF_NAME}-${import.meta.env.VITE_GITHUB_SHA}`
    return (
        <footer className={classes.footer}>
            <a href="https://github.com/nickdehart/ReactChess" target="_blank" className={classes.footerLink}>
                <span>&copy;</span> 
                {year} | Nicholas DeHart | {version || version_backup}
                <img src={github} alt="Github Icon" className={classes.gitgubIcon} />
            </a>
        </footer>
    )
}
