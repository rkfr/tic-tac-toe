import { GameFieldItem } from "../game-field-item";

export class GameFieldView {
    constructor(
        private containerElement: HTMLElement,
    ) {
    }

    private getCellMarkup(cellData: GameFieldItem): string {
        const winningClass = cellData.isWinning ? "is-winning" : "";

        return `
            <div
                class="game-cell ${cellData.sign} ${winningClass}"
                data-pos-y="${cellData.posY}"
                data-pos-x="${cellData.posX}"
                data-sign="${cellData.sign}"
            ></div>
        `;
    }

    private getRowsMarkup(rowData: GameFieldItem[]): string {
        return rowData.map(this.getCellMarkup.bind(this)).join("");
    }

    public clear(): void {
        if (this.containerElement) {
            this.containerElement.innerHTML = ""
        }
    }

    public render(rows: GameFieldItem[][] = null): void {
        if (!rows || !this.containerElement) {
            return;
        }

        this.containerElement.innerHTML = rows.map(this.getRowsMarkup.bind(this)).join("");
    }
}
