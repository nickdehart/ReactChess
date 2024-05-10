import classes from './Footer.module.css';
import github from '@/assets/github.svg';

export function Footer() {
    return (
        <footer className={classes.footer}>
            <a href="https://github.com/nickdehart/ReactChess" target="_blank" className={classes.footerLink}>
                Nicholas DeHart
                <span>&copy;</span> 
                {new Date().getFullYear()}
                <img src={github} alt="Github Icon" className={classes.gitgubIcon} />
            </a>
        </footer>
    )
}
