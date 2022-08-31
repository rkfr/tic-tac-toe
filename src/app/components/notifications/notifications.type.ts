export enum NotificationType {
    Warn = "warn",
    Success = "success",
    Move = "move",
}

export enum NotificationMessageType {
    FirstPlayerWinner = "FirstPlayerWinner",
    SecondPlayerWinner = "SecondPlayerWinner",
    Standoff = "Standoff",
    PlayerOneMoves = "PlayerOneMoves",
    PlayerTwoMoves = "PlayerTwoMoves",
}

export type NotificationShape = {
    text: string;
    type: NotificationType;
}
