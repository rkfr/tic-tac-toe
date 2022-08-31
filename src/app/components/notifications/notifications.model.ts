import {NotificationMessageType, NotificationShape, NotificationType} from "./notifications.type";


export class NotificationsModel {
    private readonly notifications: { [key: string]: NotificationShape } = {
        [NotificationMessageType.FirstPlayerWinner]: {
            text: "Congratulations! First player has won this round!",
            type: NotificationType.Success,
        },
        [NotificationMessageType.SecondPlayerWinner]: {
            text: "Congratulations! Second player has won this round!",
            type: NotificationType.Success,
        },
        [NotificationMessageType.Standoff]: {
            text: "Oops. Nobody win. Standoff!",
            type: NotificationType.Warn,
        },
        [NotificationMessageType.PlayerOneMoves]: {
            text: "First player's move",
            type: NotificationType.Move,
        },
        [NotificationMessageType.PlayerTwoMoves]: {
            text: "Second player's move",
            type: NotificationType.Move,
        },
    };

    public getNotification(notification: NotificationMessageType): NotificationShape {
        return this.notifications[notification];
    }
}
