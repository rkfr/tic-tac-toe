import {GameSign} from "../../constants";

export class GameFieldItem {
    public sign: GameSign | null = null;
    public posY: number;
    public posX: number;
    public isWinning = false;
    public isEmpty = true;

    constructor(posY: number, posX: number) {
        this.posY = posY;
        this.posX = posX;
    }

    public makeBusy(sign: GameSign | null): void {
        if (sign) {
            this.isEmpty = false;
            this.sign = sign;
        }
    }

    public makeWinning(): void {
        this.isWinning = true;
    }
}
