import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    constructor(private toastr: ToastrService) { }

    showNotification(message: string, type: string, position: string) {
        switch (type) {
            case 'info':
                this.toastr.info(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
                    "",
                    {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-info alert-with-icon",
                        positionClass: "toast-" + position
                    }
                );
                break;
            case 'success':
                this.toastr.success(
                    '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">' + message + '</span>',
                    "",
                    {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-success alert-with-icon",
                        positionClass: "toast-" + position
                    }
                );
                break;
            case 'warning':
                this.toastr.warning(
                    '<span data-notify="icon" class="nc-icon nc-bulb-63"></span><span data-notify="message">' + message + '</span>',
                    "",
                    {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-warning alert-with-icon",
                        positionClass: "toast-" + position
                    }
                );
                break;
            case 'error':
                this.toastr.error(
                    '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">' + message + '</span>',
                    "",
                    {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon",
                        positionClass: "toast-" + position
                    }
                );
                break;
            case 'primary':
                this.toastr.show(
                    '<span data-notify="icon" class="nc-icon nc-chat-round"></span><span data-notify="message">' + message + '</span>',
                    "",
                    {
                        timeOut: 4000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-primary alert-with-icon",
                        positionClass: "toast-" + position
                    }
                );
                break;
            default:
                break;
        }
    }
}
