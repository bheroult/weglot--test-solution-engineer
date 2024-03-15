import { test, expect, beforeEach, describe } from 'bun:test'

import translateContent, { AVAILABLE_LANGUAGES } from '../../src/services/translation-service.js';
import { InvalidTranslationLanguageError } from '../../src/errors.js'

let payload
let language

describe('translateContent', () => {
    beforeEach(() => {
        payload = 'this is a payload with News'
        language = AVAILABLE_LANGUAGES.FR
    })

    test('for invalid language', () => {
        let returnedError
        try {
            translateContent(payload, 'pl')
        } catch (error) {
            returnedError = error
        }
        expect(returnedError).toBeInstanceOf(InvalidTranslationLanguageError)
    })

    describe('for correct language', () => {
        test('with standard payload', () => {
            const expected = 'this is a payload with Dernières informations'
            const result = translateContent(payload, language)

            expect(result).toEqual(expected)
        })

        test('with url to be replaced', () => {
            payload = 'this is an url to be changed : http://local/en-us/some.txt'
            const expected = 'this is an url to be changed : http://local/fr-fr/some.txt'
            const result = translateContent(payload, language)

            expect(result).toEqual(expected)
        })
    })
})
