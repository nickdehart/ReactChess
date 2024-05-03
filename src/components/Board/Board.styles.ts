import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
    section: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    newGameBtn: {
        marginTop: 20,
        color: 'black',
        borderRadius: 4,
        backgroundColor: 'lightgray'
    },
    table: { 
        width: "fit-content",
        '& tbody > tr:nth-child(odd) td:not(:first-child):nth-child(even)': {
            backgroundColor: '#61dafb'
        },
        '& tbody > tr:nth-child(even) td:not(:first-child):nth-child(odd)': {
            backgroundColor: '#61dafb'
        }
    },
    cell: {
        height: 64,
        width: 79,
    },
    cellHighlight: {
        border: "1px solid red",
        cursor: 'pointer'
    },
    cellNoHighlight: {
        border: "1px solid transparent"
    }
})
