import {GameQueueController} from "../game-queue";
import {NotificationMessageType, NotificationsController} from "../notifications";
import {GameFieldController, GameItem} from "../game-field";
import {WinnerController} from "../winner";
import {MIN_STEPS_COUNT_TO_WIN, Player} from "../../constants";
import {GameView} from "./game.view";

export class GameController {
    private gameView: GameView = new GameView();
    private queue: GameQueueController = new GameQueueController();
    private field: GameFieldController = new GameFieldController();
    private notifications: NotificationsController = new NotificationsController();
    private winner: WinnerController;

    public init(): void {
        this.gameView.createStartButton();
        this.addListenerToStartButton();
    }

    public start(): void {
        this.gameView.clear();
        this.gameView.createGameView();
        this.field.init();
        this.notifications.init();
        this.getWinner();
        this.addListeners();
    }

    private getWinner(): void {
        this.winner = new WinnerController(this.field.getGameField())
    }

    private addListeners(): void {
        const field = this.field;
        const gameContainer = this.field.getGameFieldContainer();
        const queue = this.queue;
        const notifications = this.notifications;

        gameContainer.addEventListener("click", (event: Event) => {
            const target = (event.target as HTMLElement);
            const gameItemData = this.getGameItemFromDataset(target);

            if (!field.canPlace(gameItemData) || queue.isCompleted) {
                return;
            }

            this.showStepNotification();

            queue.next();
            field.updateCell({...gameItemData, sign: queue.getPlayerSign()});

            if (queue.step < MIN_STEPS_COUNT_TO_WIN) {
                return;
            }

            const winnerCheckResult = this.winner.check();

            if (!Array.isArray(winnerCheckResult)) {
                if (queue.step === queue.stepsCount) {
                    this.notifications.show(NotificationMessageType.Standoff);
                    this.endGame();
                }

                return;
            }

            const [winnerCombination, player] = winnerCheckResult;

            if (winnerCombination) {
                const winnerPlayerMessage = player === Player.First ? NotificationMessageType.FirstPlayerWinner : NotificationMessageType.SecondPlayerWinner;

                field.markAsWinner(winnerCombination);
                queue.complete();
                notifications.show(winnerPlayerMessage);
                this.endGame();
                return;
            }
        });
    }

    private getGameItemFromDataset(target: HTMLElement): GameItem {
        return {
            posX: Number(target.dataset.posX),
            posY: Number(target.dataset.posY),
            sign: target.dataset.sign as GameItem["sign"],
        };
    }

    private showStepNotification(): void {
        this.notifications.clear();

        const playerStepNotification = this.queue.getPlayerType() === Player.First
            ? NotificationMessageType.PlayerTwoMoves
            : NotificationMessageType.PlayerOneMoves;

        this.notifications.show(playerStepNotification);
    }

    private endGame(): void {
        setTimeout(() => {
            this.gameView.clear();
            this.init();
        }, 4000);
    }

    private addListenerToStartButton(): void {
        document.getElementById("start-button").addEventListener("click", () => {
            this.start();
        });
    }
}
