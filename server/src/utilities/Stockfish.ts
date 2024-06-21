
import { spawn, ChildProcessWithoutNullStreams } from "node:child_process";
import { Logger } from "./Logger";

export class Stockfish {

    constructor() {
        this.stockfish = spawn(process.env.STOCKFISH_EXE || "");
        this.stockfish.stdout.on('data', data => {
            this.logger.d(data.toString());
        });
        this.displayBoard();
    }

    private stockfish: ChildProcessWithoutNullStreams;
    private logger: Logger = new Logger("Stockfish");

    displayBoard() {
        this.logger.d("[Stockfish::stdin]: d\r\n");
        this.stockfish.stdin.cork();
        this.stockfish.stdin.write("d\r\n");
        this.stockfish.stdin.uncork();
    }

    setBoardPosition(fen: string) {

        this.logger.d(`[Stockfish::stdin]: position fen ${fen}\r\n`);
        this.stockfish.stdin.cork();
        this.stockfish.stdin.write(`position fen ${fen}\r\n`);
        this.stockfish.stdin.uncork();
        this.displayBoard();
    }

    async askForNextMove(level: number) :Promise<string> {

        this.logger.d(`[Stockfish::stdin]: go depth ${level}\r\n`);
        this.stockfish.stdin.cork();
        this.stockfish.stdin.write(`go depth ${level}\r\n`);
        this.stockfish.stdin.uncork();
    
        return new Promise((resolve, reject) => {
            this.stockfish.stdout.on('data', (data) => {
                const str = data.toString()
                if(str.includes("bestmove")) {
                    const words = str.split(" ");
                    let move = "";
                    for(let i = 0; i < words.length; i++)
                        if(words[i].includes("bestmove") && (i+1) < words.length)
                            move = words[i+1];
                    return resolve(move);
                }
            });
    
            this.stockfish.on('error', (e) => {
                this.logger.e(`[Stockfish Error]:\n${e.toString()}`)
                return reject(e.toString())
            });
        })
    }

    quitStockfish() {
        this.logger.d('[Stockfish::stdin]: Exiting stockfish');
        this.stockfish.stdin.write("quit\r\n");
        this.stockfish.stdin.end();
        this.stockfish.kill();
    }
}
