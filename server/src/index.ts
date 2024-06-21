import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Logger } from "./utilities/Logger";
import { validateFEN } from "./utilities/fenUtils";
import { Stockfish } from "./utilities/Stockfish";

dotenv.config();

const logger: Logger = new Logger("App");
const allowedOrigins = [process.env.REACT_CHESS_ORIGIN || ""];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

const app: Express = express();
app.use(cors<Request>(options));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.get("/health", (req: Request, res: Response) => {
    logger.i("Health Check");
    res.send("HEALTHY");
});

app.post("/get_next_move", async (req: Request, res: Response) => {

    try {

        const { board } = req.body;
        validateFEN(board);
        const stockfish :Stockfish = new Stockfish();
        stockfish.setBoardPosition(board);
        const move = await stockfish.askForNextMove(10);
        res.send({ success: true, bestmove: move.replace(/\s/g, "").toUpperCase() });

    } catch(err) {

        logger.e(`${err}`)
        res.status(500).send({ success: false, error: err });

    }

});

app.listen(port, () => {
    logger.i(`[server]: Server is running at http://localhost:${port}`);
});
