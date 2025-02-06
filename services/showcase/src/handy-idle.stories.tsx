import { useState } from 'react';
import { useIdle } from '@handy-ones/handy-idle';

export default {
    title: 'Handy idle'
}

export const Basic = () => {
    const isIdle = useIdle(5000); // 5 seconds

    return (
        <div style={{ padding: '20px' }}>
            <h2>User is: {isIdle ? '😴 Idle' : '👋 Active'}</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
                Move your mouse, press a key, or scroll to be active.
                After 5 seconds of inactivity, you&apos;ll be marked as idle.
            </p>
        </div>
    );
};

export const WithCallbacks = () => {
    const [log, setLog] = useState<string[]>([]);

    const isIdle = useIdle({
        timeout: 3000,
        onIdle: () => {
            setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: User became idle`]);
        },
        onActive: () => {
            setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: User became active`]);
        }
    });

    return (
        <div style={{ padding: '20px' }}>
            <h2>Status: {isIdle ? '😴 Idle' : '👋 Active'}</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                Idle after 3 seconds of inactivity
            </p>
            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                maxHeight: '200px',
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: '12px'
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Activity Log:</div>
                {log.length === 0 ? (
                    <div style={{ color: '#999' }}>No activity yet...</div>
                ) : (
                    log.map((entry, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                            {entry}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export const CustomTimeout = () => {
    const isIdle10s = useIdle(10000);
    const isIdle30s = useIdle(30000);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <div style={{
                    padding: '15px',
                    border: '2px solid',
                    borderColor: isIdle10s ? '#ff9800' : '#4caf50',
                    borderRadius: '8px',
                    transition: 'all 0.3s'
                }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>10 Second Timeout</h3>
                    <div style={{ fontSize: '24px' }}>
                        {isIdle10s ? '😴 Idle' : '👋 Active'}
                    </div>
                </div>

                <div style={{
                    padding: '15px',
                    border: '2px solid',
                    borderColor: isIdle30s ? '#f44336' : '#4caf50',
                    borderRadius: '8px',
                    transition: 'all 0.3s'
                }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>30 Second Timeout</h3>
                    <div style={{ fontSize: '24px' }}>
                        {isIdle30s ? '😴 Idle' : '👋 Active'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const IdleWarning = () => {
    const isIdle = useIdle(8000);

    return (
        <div style={{ padding: '20px', minHeight: '200px' }}>
            {isIdle && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#ff9800',
                    color: 'white',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    animation: 'slideIn 0.3s ease-out',
                    zIndex: 1000
                }}>
                    <strong>⚠️ You&apos;ve been idle for 8 seconds</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                        Move your mouse to stay active
                    </p>
                </div>
            )}
            <h2>Idle Warning Example</h2>
            <p style={{ color: '#666' }}>
                A warning will appear after 8 seconds of inactivity
            </p>
        </div>
    );
};

export const SessionTimeout = () => {
    const [sessionActive, setSessionActive] = useState(true);

    useIdle({
        timeout: 15000,
        onIdle: () => {
            setSessionActive(false);
        }
    });

    if (!sessionActive) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                margin: '20px'
            }}>
                <h2 style={{ color: '#f44336' }}>🔒 Session Expired</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Your session has expired due to inactivity
                </p>
                <button
                    onClick={() => setSessionActive(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Restart Session
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#4caf50' }}>✅ Session Active</h2>
            <p style={{ color: '#666' }}>
                Your session will expire after 15 seconds of inactivity
            </p>
            <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px'
            }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    💡 This simulates a real session timeout scenario
                </p>
            </div>
        </div>
    );
};
