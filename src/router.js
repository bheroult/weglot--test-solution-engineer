import translateContent, { AVAILABLE_LANGUAGES } from './services/translation-service.js'
import { stringToHtmlFile } from './utils/formatter-util.js'

import { EN_BASE_PATH, FR_BASE_PATH, HOST } from './environment.js'

/**
 * Execute classic redirection of content
 * @param {string} path string
 * @returns {Response}
 */
async function standardProxyContent(path) {
    const url = `https://${HOST}/${path}`
    console.log('[Info] Redirect to ressource ', url)

    return Response.redirect(url)
}

/**
 * Fetch ressource but serve it as its own, without redirection
 * @param {string} path string
 * @returns {Response}
 */
async function proxyPage(path) {
    const url = `https://${HOST}/${path}`
    console.log('[Info] Fetch ressource ', url)

    return fetch(url).then(result => {
        const data = result.body
        const res = new Response(data)
        return res
    })
}

/**
 * Fetch ressource from en content, translate it in french, and serve it as its own, without redirection
 * @param {string} path string
 * @returns {Response}
 */
async function proxyFrPageFromEn(path) {
    const pathToFetch = path.replace(FR_BASE_PATH, EN_BASE_PATH)
    const url = `https://${HOST}/${pathToFetch}`
    console.log('[Info] Fetch ressource ', url)

    return fetch(`https://${HOST}/${pathToFetch}`)
        .then(result => {
            return result.text()
        })
        .then((data) => {
            const translatedPage = translateContent(data, AVAILABLE_LANGUAGES.FR)
            return stringToHtmlFile(translatedPage)
        })
        .then((htmlFile) => {
            const res = new Response(htmlFile)
            return res
        })
}

/**
 * Handle request based of the required path
 * @param {Request} request string
 * @returns {Response}
 */
async function router(request) {
    const path = new URL(request.url).pathname
    const isHtmlPage = path.includes('.html')

    const isEnRootPage = path === EN_BASE_PATH
    const isFrRootPage = path === FR_BASE_PATH
    const isFrPage = path.includes(FR_BASE_PATH) && isHtmlPage
    const isEnPage = path.includes(EN_BASE_PATH) && isHtmlPage

    if (path === '/') return proxyPage(EN_BASE_PATH)

    if (path === '/ping') return new Response("pong")

    if (isFrRootPage || isFrPage) return proxyFrPageFromEn(path)

    if (isEnRootPage || isEnPage) return proxyPage(path)

    // used to retrieve js/json/css content that is on target server, 
    // and does not require specific display management such as HTML pages
    return standardProxyContent(path)
}

export default router
