import { sendMailTemplate } from "../utils/mail.js";

interface IVerifyRegister {
    email: string;
    options: {
        name: string;
        otp: string
    }
}
export class VerifyRegister {
    public data;
    constructor(data: IVerifyRegister) {
        this.data = data;
        this.send();
    }

    private subject() {
        return 'Xác thực tài khoản';
    }

    private view() {
        return 'verify';
    }

    private send() {
        const template = this.view();
        return sendMailTemplate(this.data.email, this.subject(), template, this.data.options);
    }
}