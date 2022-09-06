export default {
    port: 8080,
    outDir: 'dist',
    base: '/handy-ones/',
    addons: {
        a11y: {
            enabled: true
        },
        action: {
            enabled: false,
            defaultState: []
        },
        control: {
            enabled: false,
            defaultState: {}
        },
        ladle: {
            enabled: false
        },
        mode: {
            enabled: false,
            defaultState: "full"
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
            defaultState: "light"
        }
    }
};
