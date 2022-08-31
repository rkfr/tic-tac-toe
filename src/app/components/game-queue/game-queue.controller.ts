import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH, GameSign, Player} from "../../constants";

export class GameQueueController {
    public stepsCount = GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT;
    public step = 0;
    public isCompleted = false;
    public playerType: Player = null;

    public getPlayerType(): Player {
        if (!this.playerType) {
            return Player.First;
        }

        return this.playerType === Player.First ? Player.Second : Player.First;
    }

    public getPlayerSign(): GameSign {
        return this.playerType === Player.First ? GameSign.Cross : GameSign.Zero;
    }

    public next(): void {
        if (this.isCompleted) {
            return;
        }

        this.step += 1;

        if (this.step >= this.stepsCount) {
            this.complete();
            return;
        }

        if (!this.playerType) {
            this.playerType = Player.First;
            return;
        }

        this.playerType = this.getPlayerType();
    }

    public complete(): void {
        this.isCompleted = true;
        this.playerType = null;
    }
}
