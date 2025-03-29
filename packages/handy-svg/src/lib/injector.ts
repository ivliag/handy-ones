import debounce from 'lodash.debounce';
import {fetchSvg} from './fetcher';
import {extractFileName} from './utils';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const INJECTION_DELAY = 20;

type LoadOptions = {
    flushImmediate?: boolean;
    timeout?: number;
    retryCount?: number;
}

class Injector {
    private fragment: DocumentFragment | null = null;

    private symbolsMountingPoint: SVGElement | null = null;

    private cache = new Set();

    private parseSvgString(svg: string) {
        return new DOMParser().parseFromString(svg, 'image/svg+xml').children[0];
    }

    private svgToSymbol({id, svgString}: {id: string; svgString: string}): SVGElement {
        const svgDocument = this.parseSvgString(svgString);
        const viewBox = svgDocument.getAttribute('viewBox');
        const symbol = document.createElementNS(SVG_NAMESPACE, 'symbol');

        if (viewBox) {
            symbol.setAttributeNS(null, 'viewBox', viewBox);
        }

        symbol.setAttributeNS(null, 'id', id);
        symbol.innerHTML = svgDocument.innerHTML;

        return symbol;
    }

    private accumulateSvg = ({url, svgString}: {url: string, svgString: string}) => {
        const id = this.getId(url);
        const symbol = this.svgToSymbol({id, svgString});

        this.fragment = this.fragment || document.createDocumentFragment();
        this.fragment.append(symbol);
    };

    private flushSvg = () => {
        const sprite = this.getSymbolMountPoint();

        if (this.fragment) {
            sprite.appendChild(this.fragment);
            this.fragment = null;
        }
    }

    private deboucedflushSvg = debounce(this.flushSvg, INJECTION_DELAY);

    private getSymbolMountPoint() {
        if (!this.symbolsMountingPoint) {
            const sprite = document.createElementNS(SVG_NAMESPACE, 'svg');
            this.symbolsMountingPoint = sprite;

            sprite.ariaHidden = 'true';
            sprite.style.width = '0';
            sprite.style.height = '0';
            sprite.style.overflow = 'hidden';

            document.body.appendChild(sprite);
        }

        return this.symbolsMountingPoint;
    }

    getId(url: string) {
        return extractFileName(url);
    }

    async load(
        url: string,
        {flushImmediate, timeout, retryCount}: LoadOptions = {}
    ) {
        if (this.cache.has(url)) {
            return;
        }

        this.cache.add(url);

        return fetchSvg(url, {timeout, retryCount})
            .then((svgString) => {
                this.accumulateSvg({url, svgString})
                flushImmediate ? this.flushSvg() : this.deboucedflushSvg()
            })
            .catch((error: Error) => {
                this.cache.delete(url);
                throw error;
            });
    }
}

export const injector = new Injector();
