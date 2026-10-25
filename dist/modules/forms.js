export const normalizePlainText = (value, max = 2000) => String(value ?? "").replace(/[\u0000-\u001f\u007f]/gu, " ").replace(/\s+/gu, " ").trim().slice(0, max);
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value) && value.length <= 254;
export function validateContact(input) {
    const issues = [];
    const name = normalizePlainText(input.name, 120);
    const email = normalizePlainText(input.email, 254).toLowerCase();
    const message = normalizePlainText(input.message, 5000);
    if (normalizePlainText(input.website, 200))
        issues.push({ field: "form", message: "Unable to accept this submission." });
    if (name.length < 2)
        issues.push({ field: "name", message: "Enter your name." });
    if (!isEmail(email))
        issues.push({ field: "email", message: "Enter a valid email address." });
    if (message.length < 10)
        issues.push({ field: "message", message: "Add a little more detail." });
    return issues;
}
export function mountContactForm(form, options) {
    const handler = async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const issues = validateContact({ name: data.get("name"), email: data.get("email"), message: data.get("message"), website: data.get("website") });
        const status = form.querySelector("[data-form-status]");
        if (issues.length) {
            if (status)
                status.textContent = issues[0].message;
            return;
        }
        const button = form.querySelector("[type=submit]");
        if (button)
            button.disabled = true;
        try {
            const response = await fetch(options.endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
            if (!response.ok)
                throw new Error("Submission failed");
            form.reset();
            if (status)
                status.textContent = options.successMessage ?? "Thanks. Your message has been received.";
        }
        catch {
            if (status)
                status.textContent = "The form could not be submitted. Please use another contact method.";
        }
        finally {
            if (button)
                button.disabled = false;
        }
    };
    form.addEventListener("submit", handler);
    return () => form.removeEventListener("submit", handler);
}
