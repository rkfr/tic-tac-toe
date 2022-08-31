const GAME_FIELD_WIDTH = 3;
const GAME_FIELD_HEIGHT = 3;
const MIN_STEPS_COUNT_TO_WIN = 5;
const APP_NOTIFICATIONS_CONTAINER = "notifications-container";
const APP_GAME_FIELD_CONTAINER = "game-field";

enum GameSign {
    Cross = "cross",
    Zero = "zero",
}

enum Player {
    First = "First Player",
    Second = "Second Player",
}

export {
    GAME_FIELD_WIDTH,
    GAME_FIELD_HEIGHT,
    MIN_STEPS_COUNT_TO_WIN,
    APP_NOTIFICATIONS_CONTAINER,
    APP_GAME_FIELD_CONTAINER,
    GameSign,
    Player,
};
