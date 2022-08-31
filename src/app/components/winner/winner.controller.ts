import {GameFieldItem} from "../game-field-item";
import {GameSign, Player} from "../../constants";

export class WinnerController {
    private winningCombinations: GameFieldItem[][];

    constructor(private readonly gameField: GameFieldItem[][]) {
        this.initCombinations();
    }

    private initCombinations(): void {
        const gameField: GameFieldItem[][] = this.gameField;

        this.winningCombinations = [
            gameField[0],
            gameField[1],
            gameField[2],
            [gameField[0][0], gameField[1][1], gameField[2][2]],
            [gameField[0][2], gameField[1][1], gameField[2][0]],
            [gameField[0][0], gameField[1][0], gameField[2][0]],
            [gameField[0][1], gameField[1][1], gameField[2][1]],
            [gameField[0][2], gameField[1][2], gameField[2][2]],
        ];
    }

    public check(): [GameFieldItem[], Player] | false {
        const crossWinner = this.winningCombinations.find(
            (row: GameFieldItem[]) => row.every((cell: GameFieldItem) => cell.sign === GameSign.Cross),
        );
        const zeroWinner = this.winningCombinations.find(
            (row: GameFieldItem[]) => row.every((cell: GameFieldItem) => cell.sign === GameSign.Zero),
        );

        if (![crossWinner, zeroWinner].some(Boolean)) {
            return false;
        }

        return Boolean(crossWinner) ? [crossWinner, Player.First] : [zeroWinner, Player.Second];
    }
}
