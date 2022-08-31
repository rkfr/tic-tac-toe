import {APP_GAME_FIELD_CONTAINER} from "../../constants";
import {GameItem} from "./game-field.type";
import {GameFieldView} from "./game-field.view";
import {GameFieldModel} from "./game-field.model";
import {GameFieldItem} from "../game-field-item";

export class GameFieldController {
    private gameFieldContainer: HTMLElement;
    private fieldModel: GameFieldModel;
    private fieldView: GameFieldView;

    public init(): void {
        this.initContainer();
        this.createField();
    }

    private initContainer(): void {
        this.gameFieldContainer = document.getElementById(APP_GAME_FIELD_CONTAINER);
    }

    private createField(): void {
        this.fieldModel = new GameFieldModel();
        this.fieldView = new GameFieldView(this.gameFieldContainer);

        this.fieldView.clear();
        this.fieldView.render(this.fieldModel.field);
    }

    public canPlace(coords: GameItem): boolean {
        return this.fieldModel.canPlace(coords.posY, coords.posX);
    }

    public updateCell(coords: GameItem): void {
        this.fieldModel.fillCell(coords);
        this.fieldView.render(this.fieldModel.field);
    }

    public markAsWinner(cells: GameFieldItem[]): void {
        this.fieldModel.markAsWinning(cells);
        this.fieldView.render(this.fieldModel.field);
    }

    public getGameField(): GameFieldItem[][] {
        return this.fieldModel.field;
    }

    public getGameFieldContainer(): HTMLElement {
        return this.gameFieldContainer as HTMLElement;
    }
}
