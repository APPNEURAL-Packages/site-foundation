export function commonPages(brandName) {
    return [
        { id: "about", path: "/about", title: `About ${brandName}`, description: `Learn what ${brandName} does and who it serves.`, requiredFacts: ["approved brand description", "audience", "real differentiators"] },
        { id: "contact", path: "/contact", title: `Contact ${brandName}`, description: `Choose a verified way to contact ${brandName}.`, requiredFacts: ["working contact method", "response expectation"] },
        { id: "privacy", path: "/privacy", title: "Privacy policy", description: "How this website handles personal information.", requiredFacts: ["data collected", "purpose", "retention", "processors", "contact"] },
        { id: "terms", path: "/terms", title: "Terms of use", description: "The terms that apply when using this website.", requiredFacts: ["operator identity", "acceptable use", "liability", "governing terms"] },
        { id: "accessibility", path: "/accessibility", title: "Accessibility", description: "Accessibility support and how to report a problem.", requiredFacts: ["supported contact method", "known limitations"] },
        { id: "not-found", path: "/404", title: "Page not found", description: "The requested page could not be found.", requiredFacts: ["home link", "primary navigation"] },
    ];
}
export const commonFooterLinks = (brandName, available) => commonPages(brandName).filter((page) => available.includes(page.id)).map(({ id, path, title }) => ({ id, path, title }));
