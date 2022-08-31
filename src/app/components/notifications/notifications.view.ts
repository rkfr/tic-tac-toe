import {NotificationShape} from "./notifications.type";

export class NotificationsView {
    constructor(private readonly containerElement: HTMLElement | null) {
        this.clear();
    }

    public clear(): void {
        if (this.isContainerExist()) {
            this.containerElement.innerHTML = "";
        }
    }

    public render(notification: NotificationShape): void {
        if (!this.isContainerExist()) {
            throw new Error("provide container element for 'notifications.view'");
        }

        this.containerElement.innerHTML = `
            <div
                class="notification ${notification.type}"
            >
                ${notification.text}
            </div>
        `;
    }

    private isContainerExist(): boolean {
        return Boolean(this.containerElement);
    }
}
