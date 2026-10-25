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
