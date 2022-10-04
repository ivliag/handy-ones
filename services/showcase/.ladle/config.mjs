const globalStyles = `
    body {
        font-family: sans-serif;
    }
`

const ladleConfig = {
    port: 8080,
    outDir: 'dist',
    base: '/handy-ones/',
    appendToHead: `<style>${globalStyles}</style>`,
    addons: {
        a11y: {
            enabled: false
        },
        action: {
            enabled: false,
            defaultState: []
        },
        control: {
            enabled: true,
            defaultState: 'opened'
        },
        ladle: {
            enabled: false
        },
        mode: {
            enabled: true,
            defaultState: 'full'
        },
        rtl: {
            enabled: false,
            defaultState: false
        },
        source: {
            enabled: true,
            defaultState: false
        },
        theme: {
            enabled: false,
            defaultState: 'light'
        }
    }
};

export default ladleConfig;
