import {APP_GAME_FIELD_CONTAINER, APP_NOTIFICATIONS_CONTAINER} from "../../constants";

export class GameView {
    private readonly body = document.querySelector("body");

    public createGameView(): void {
        const containerElements = [APP_NOTIFICATIONS_CONTAINER, APP_GAME_FIELD_CONTAINER]
            .map((selector: string) => {
                const elementContainer = document.createElement("div");

                elementContainer.classList.add(selector);
                elementContainer.setAttribute("id", selector);

                return elementContainer;
            });

        this.body.append(...containerElements);
    }

    public createStartButton(): void {
        const button = document.createElement("button");

        button.classList.add("start-button");
        button.setAttribute("id", "start-button");
        button.textContent = "Start Game";

        this.body.append(button);
    }

    public clear(): void {
        this.body.innerHTML = "";
    }
}
