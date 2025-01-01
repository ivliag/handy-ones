import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';
import '@handy-ones/handy-copy-clipboard/dist/handy-copy-clipboard.css';

export default {
    title: 'Handy copy clipboard'
}

export const Basic = () => (
    <div style={{ padding: '20px' }}>
        <HandyCopyClipboard text="Hello, World!" />
    </div>
);

export const CustomContent = () => (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <HandyCopyClipboard text="Custom content example">
            📋 Copy Text
        </HandyCopyClipboard>
        <HandyCopyClipboard text="Another example">
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copy
            </span>
        </HandyCopyClipboard>
    </div>
);

export const RenderProp = () => (
    <div style={{ padding: '20px' }}>
        <HandyCopyClipboard text="Render prop pattern example">
            {(state) => {
                switch (state) {
                    case 'copying':
                        return '⏳ Copying...';
                    case 'success':
                        return '✅ Copied!';
                    case 'error':
                        return '❌ Failed';
                    default:
                        return '📋 Copy Code';
                }
            }}
        </HandyCopyClipboard>
    </div>
);

export const WithCallbacks = () => (
    <div style={{ padding: '20px' }}>
        <HandyCopyClipboard
            text="Callback example text"
            onCopy={(success, error) => {
                if (success) {
                    console.log('✅ Successfully copied to clipboard!');
                } else {
                    console.error('❌ Failed to copy:', error);
                }
            }}
        />
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Open console to see callback output
        </p>
    </div>
);

export const CustomTimeout = () => (
    <div style={{ padding: '20px' }}>
        <HandyCopyClipboard
            text="This will reset after 5 seconds"
            timeout={5000}
            successMessage="Copied! (resets in 5s)"
        />
    </div>
);

export const CodeBlock = () => {
    const code = `import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';

function App() {
  return (
    <HandyCopyClipboard text="Hello, World!">
      Copy
    </HandyCopyClipboard>
  );
}`;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                position: 'relative',
                backgroundColor: '#1e1e1e',
                padding: '20px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4'
            }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <HandyCopyClipboard
                        text={code}
                        style={{
                            backgroundColor: '#2d2d2d',
                            border: '1px solid #444',
                            color: '#fff',
                            fontSize: '12px',
                            padding: '6px 12px'
                        }}
                    >
                        {(state) => state === 'success' ? '✓ Copied' : 'Copy Code'}
                    </HandyCopyClipboard>
                </div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {code}
                </pre>
            </div>
        </div>
    );
};

export const EmailAddress = () => (
    <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '10px' }}>Contact us:</p>
        <HandyCopyClipboard
            text="example@email.com"
            successMessage="Email copied!"
        >
            {(state) => (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📧 example@email.com
                    {state === 'success' && <span style={{ fontSize: '12px' }}>✓</span>}
                </span>
            )}
        </HandyCopyClipboard>
    </div>
);

export const Disabled = () => (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <HandyCopyClipboard text="This button is disabled" disabled>
            Cannot Copy (Disabled)
        </HandyCopyClipboard>
        <p style={{ fontSize: '14px', color: '#666' }}>
            The button above is permanently disabled
        </p>
    </div>
);

export const MultipleButtons = () => (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {[
            { label: 'Username', value: 'john.doe' },
            { label: 'API Key', value: 'sk-1234567890abcdef' },
            { label: 'URL', value: 'https://example.com/api' },
            { label: 'Token', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
            { label: 'Secret', value: 'secret_key_abc123' },
            { label: 'ID', value: 'usr_9876543210' }
        ].map((item) => (
            <div key={item.label} style={{
                border: '1px solid #ddd',
                padding: '15px',
                borderRadius: '6px',
                backgroundColor: '#fafafa'
            }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: 'bold' }}>
                    {item.label}
                </div>
                <div style={{
                    fontSize: '14px',
                    marginBottom: '10px',
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {item.value}
                </div>
                <HandyCopyClipboard
                    text={item.value}
                    style={{ width: '100%', fontSize: '12px' }}
                >
                    {(state) => state === 'success' ? '✓ Copied' : 'Copy'}
                </HandyCopyClipboard>
            </div>
        ))}
    </div>
);
