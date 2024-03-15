export class InvalidTranslationLanguageError extends Error {
    constructor(language) {
        const message = `Language ${language} not available for translation`
        super(message)
    }
}