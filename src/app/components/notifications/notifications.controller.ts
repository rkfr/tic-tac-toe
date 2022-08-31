import {NotificationMessageType, NotificationShape} from "./notifications.type";
import {NotificationsView} from "./notifications.view";
import {NotificationsModel} from "./notifications.model";
import {APP_NOTIFICATIONS_CONTAINER} from "../../constants";

export class NotificationsController {
    private notificationsView: NotificationsView;
    private readonly notificationsModel: NotificationsModel = new NotificationsModel();

    constructor(
        private readonly messageDelay: number = 8000,
    ) {
    }

    public init(): void {
        const viewContainer = document.getElementById(APP_NOTIFICATIONS_CONTAINER);

        this.notificationsView = new NotificationsView(viewContainer);
    }

    public clear(): void {
        this.notificationsView.clear();
    }

    public show(notification: NotificationMessageType): void {
        const message: NotificationShape = this.notificationsModel.getNotification(notification);

        this.notificationsView.render(message);

        setTimeout(() => {
            this.notificationsView.clear();
        }, this.messageDelay);
    }
}
