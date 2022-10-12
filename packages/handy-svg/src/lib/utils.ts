export function extractFileName(url = ''): string {
    const SVG_NAME_REGEXP = /([0-9a-zA-z\-_.]+)\.svg$/i;
    const matched = url.match(SVG_NAME_REGEXP);

    if (!matched) {
        throw new Error('svg url does not match pattern');
    }

    return matched[1]!;
}

export function checkSvgContent(svgContent: string) {
    const FORBIDDEN_WORDS = [
        'javascript',
        'onload',
        'onerror',
        'iframe',
        'script'
    ].join('|');

    const XSS_REGEXP = new RegExp(FORBIDDEN_WORDS, 'gim');

    if (XSS_REGEXP.test(svgContent)) {
        throw new Error('Possible XSS attack');
    }
}
