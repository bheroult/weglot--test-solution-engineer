import { EN_BASE_PATH, FR_BASE_PATH } from '../environment.js'
import { InvalidTranslationLanguageError } from '../errors.js'

import frDictionary from '../languages/dictionary-fr.json'

export const AVAILABLE_LANGUAGES = {
    FR: 'FR'
}

/**
 * Translate from English parts of a string based on key availble in dictionary
 * @param {string} payload
 * @param {string} language
 * @returns {string}
 * @throws error - in case the required language for translation is not available
 */
function translateContent(payload, language) {
    let dictionary
    let basePath
    switch (language) {
        case AVAILABLE_LANGUAGES.FR:
            dictionary = frDictionary
            basePath = FR_BASE_PATH
            break
        default:
            throw new InvalidTranslationLanguageError(language)
    }

    let translatedPayload = payload
    // do not use Object.entries on dictionary if you want to prioritize some translations at the beginning of the dictionary
    for (const translationKey in dictionary) {
        translatedPayload = translatedPayload.replaceAll(translationKey, dictionary[translationKey])
    }

    // replace all paths
    translatedPayload = translatedPayload.replaceAll(EN_BASE_PATH, basePath)

    return translatedPayload
}

export default translateContent
