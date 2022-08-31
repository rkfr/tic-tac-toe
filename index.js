const GAME_FIELD_WIDTH = 3;
const GAME_FIELD_HEIGHT = 3;
const MIN_STEPS_COUNT_TO_WIN = 5;
const GAME_SIGN = {
    Cross: "cross",
    Zero: "zero",
};
const PLAYER_TYPE = {
    First: "First Player",
    Second: "Second Player",
};
const NOTIFICATION = {
    FirstPlayerWinner: "FirstPlayerWinner",
    SecondPlayerWinner: "SecondPlayerWinner",
    Standoff: "Standoff",
}

const NOTIFICATION_TYPE = {
    Warn: "warn",
    Success: "success",
}

class NotificationsModel {
    notifications = {
        FirstPlayerWinner: {
            text: "Congratulations! First player has won this round!",
            type: NOTIFICATION_TYPE.Success,
        },
        SecondPlayerWinner: {
            text: "Congratulations! Second player has won this round!",
            type: NOTIFICATION_TYPE.Success,
        },
        Standoff: {
            text: "Oops. Nobody win. Standoff!",
            type: NOTIFICATION_TYPE.Warn,
        },
    };

    getNotification(notificationType) {
        return this.notifications[notificationType];
    }
}

class NotificationsView {
    containerElement;

    constructor(containerElement) {
        this.containerElement = containerElement;

        this.clear();
    }

    clear() {
        this.containerElement.innerHTML = "";
    }

    render(notification) {
        this.containerElement.innerHTML = `
            <div
                class="notification ${notification.type}"
            >
                ${notification.text}
            </div>
        `;
    }
}

class NotificationsController {
    notificationsView = new NotificationsView(document.querySelector("#notifications-container"));
    notificationsModel = new NotificationsModel();
    messageDelay;

    constructor(messageDelay = 8000) {
        this.messageDelay = messageDelay;
    }

    show(notificationType) {
        const message = this.notificationsModel.getNotification(notificationType);

        this.notificationsView.render(message);

        setTimeout(() => {
            this.notificationsView.clear();
        }, this.messageDelay);
    }
}

class Winner {
    field;
    combinations;

    constructor(field) {
        this.field = field;
        this.initCombinations();
    }

    initCombinations() {
        const gameField = this.field;

        this.combinations = [
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

    check() {
        const crossWinner = this.combinations.find(row => row.every(cell => cell.sign === GAME_SIGN.Cross));
        const zeroWinner = this.combinations.find(row => row.every(cell => cell.sign === GAME_SIGN.Zero));

        if (![crossWinner, zeroWinner].some(Boolean)) {
            return false;
        }

        return Boolean(crossWinner) ? [crossWinner, PLAYER_TYPE.First] : [zeroWinner, PLAYER_TYPE.Second];
    }
}

class GameFieldItem {
    isWinning = false;
    isEmpty = true;
    sign = null;
    posY;
    posX;

    constructor(posY, posX) {
        this.posY = posY;
        this.posX = posX;
    }

    makeBusy(sign = null) {
        if (sign) {
            this.isEmpty = false;
            this.sign = sign;
        }
    }

    makeWinning() {
        this.isWinning = true;
    }
}

class GameFieldModel {
    field = [];

    constructor() {
        this.init();
    }

    init() {
        this.create();
    }

    create() {
        const field = [];

        for (let y = 0; y < GAME_FIELD_HEIGHT; y++) {
            const row = [];

            for (let x = 0; x < GAME_FIELD_WIDTH; x++) {
                row.push(new GameFieldItem(y, x));
            }

            field.push(row);
        }

        this.field = field;
    }

    fillCell({posY, posX, sign}) {
        this.field[posY][posX].makeBusy(sign);
    }

    markAsWinning(row) {
        row.forEach(cell => {
            this.field[cell.posY][cell.posX].makeWinning();
        });
    }

    canPlace(posY, posX) {
        return this.field[posY][posX].isEmpty;
    }
}

class GameFieldView {
    constructor(containerElement = null) {
        this.containerElement = containerElement;
    }

    cell(cellData) {
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

    row(rowData) {
        return rowData.map(this.cell.bind(this)).join("");
    }

    clear() {
        this.containerElement.innerHTML = ""
    }

    render(rows = null) {
        if (!rows || !this.containerElement) {
            return;
        }

        this.containerElement.innerHTML = rows.map(this.row.bind(this)).join("");
    }
}

class GameFieldController {
    gameElement = document.querySelector("#game-field");
    fieldModel;
    fieldView;

    init() {
        this.createField();
    }

    createField() {
        this.fieldModel = new GameFieldModel();
        this.fieldView = new GameFieldView(this.gameElement);

        this.fieldView.clear();
        this.fieldView.render(this.fieldModel.field);
    }

    canPlace(coords) {
        return this.fieldModel.canPlace(coords.posY, coords.posX);
    }

    updateCell(coords) {
        this.fieldModel.fillCell(new Turn(coords));
        this.fieldView.render(this.fieldModel.field);
    }

    markAsWinner(cells) {
        this.fieldModel.markAsWinning(cells);
        this.fieldView.render(this.fieldModel.field);
    }
}

class Turn {
    constructor({sign, posY, posX}) {
        this.sign = sign;
        this.posY = Number(posY);
        this.posX = Number(posX);
    }
}

class GameQueue {
    stepsCount = GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT;
    step = 0;
    playerType = null;
    isCompleted = false;

    getPlayerSign() {
        return this.playerType === PLAYER_TYPE.First ? GAME_SIGN.Cross : GAME_SIGN.Zero;
    }

    getPlayerType() {
        return this.playerType = this.playerType === PLAYER_TYPE.First ? PLAYER_TYPE.Second : PLAYER_TYPE.First;
    }

    next() {
        if (this.isCompleted) {
            return;
        }

        this.step += 1;

        if (this.step >= this.stepsCount) {
            this.complete();
            return;
        }

        if (!this.playerType) {
            this.playerType = PLAYER_TYPE.First;
            return;
        }

        this.playerType = this.getPlayerType();
    }

    complete() {
        this.isCompleted = true;
        this.playerType = null;
    }
}

const main = () => {
    const queue = new GameQueue();
    const field = new GameFieldController();
    const notifications = new NotificationsController();

    field.init();

    const winner = new Winner(field.fieldModel.field);

    field.gameElement.addEventListener("click", ({target}) => {
        if (!field.canPlace(target.dataset) || queue.isCompleted) {
            return;
        }

        queue.next();
        field.updateCell({...target.dataset, sign: queue.getPlayerSign()});

        if (queue.step < MIN_STEPS_COUNT_TO_WIN) {
            return;
        }

        const winnerCheckResult = winner.check();

        if (!Array.isArray(winnerCheckResult)) {
            if (queue.step === queue.stepsCount) {
                notifications.show(NOTIFICATION.Standoff);
            }

            return;
        }

        const [winnerCombination, player] = winnerCheckResult;

        if (winnerCombination) {
            const winnerPlayerMessage = player === PLAYER_TYPE.First ? NOTIFICATION.FirstPlayerWinner : NOTIFICATION.SecondPlayerWinner;

            field.markAsWinner(winnerCombination);
            queue.complete();
            notifications.show(winnerPlayerMessage);
        }
    });
};

main();
