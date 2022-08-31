import { GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH } from "../../constants";
import { GameFieldItem } from "../game-field-item";
import {GameItem} from "./game-field.type";

export class GameFieldModel {
    field: GameFieldItem[][] = [];

    constructor() {
        this.init();
    }

    private init(): void {
        this.createGameField();
    }

    private createGameField(): void {
        const field: GameFieldItem[][] = [];

        for (let y = 0; y < GAME_FIELD_HEIGHT; y++) {
            const row: GameFieldItem[] = [];

            for (let x = 0; x < GAME_FIELD_WIDTH; x++) {
                row.push(new GameFieldItem(y, x));
            }

            field.push(row);
        }

        this.field = field;
    }

    public fillCell({posY, posX, sign}: GameItem): void {
        this.field[posY][posX].makeBusy(sign);
    }

    public markAsWinning(row: GameFieldItem[]): void {
        row.forEach((cell: GameFieldItem) => {
            this.field[cell.posY][cell.posX].makeWinning();
        });
    }

    public canPlace(posY: number, posX: number): boolean {
        return this.field[posY][posX].isEmpty;
    }
}
