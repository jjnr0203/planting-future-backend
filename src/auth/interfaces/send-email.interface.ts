export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    title: string;
    text: string;
    content: string;
};

export interface Attachment {
    filename: string;
    path: string;
}