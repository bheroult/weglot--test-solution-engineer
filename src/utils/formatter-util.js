/**
 * Takes a string to turn it into an HTML content than can be transfered
 * @param {string} contentString content of the file
 * @returns {file} HTML content
 */
export async function stringToHtmlFile(contentString) {
    const tempHtmlFilePath = '../temp-files/page.html'
    return Bun.write(tempHtmlFilePath, contentString)
        .then(() => {
            return Bun.file(tempHtmlFilePath)
        })
}
