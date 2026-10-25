export type FormIssue = {
    field: string;
    message: string;
};
export declare const normalizePlainText: (value: unknown, max?: number) => string;
export declare const isEmail: (value: string) => boolean;
export declare function validateContact(input: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    website?: unknown;
}): FormIssue[];
export type ContactFormOptions = {
    endpoint: string;
    successMessage?: string;
};
export declare function mountContactForm(form: HTMLFormElement, options: ContactFormOptions): () => void;
