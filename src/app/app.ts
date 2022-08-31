import {GameController} from "./components/game/game.controller";

export class App {
    public init(): void {
        const game = new GameController();

        game.init();
    }
}
