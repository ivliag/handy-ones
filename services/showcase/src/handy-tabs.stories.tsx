import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@handy-ones/handy-tabs';

export default {
    title: 'Handy tabs'
}

export const Basic = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Tabs>
                <TabList style={{
                    display: 'flex',
                    gap: '4px',
                    borderBottom: '2px solid #e0e0e0',
                    marginBottom: '20px'
                }}>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '16px',
                        borderBottom: '2px solid transparent',
                        marginBottom: '-2px',
                        transition: 'all 0.2s'
                    }}>
                        Tab 1
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '16px',
                        borderBottom: '2px solid transparent',
                        marginBottom: '-2px',
                        transition: 'all 0.2s'
                    }}>
                        Tab 2
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '16px',
                        borderBottom: '2px solid transparent',
                        marginBottom: '-2px',
                        transition: 'all 0.2s'
                    }}>
                        Tab 3
                    </Tab>
                </TabList>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <h3 style={{ marginTop: 0 }}>Content for Tab 1</h3>
                        <p>This is the content of the first tab.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <h3 style={{ marginTop: 0 }}>Content for Tab 2</h3>
                        <p>This is the content of the second tab.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <h3 style={{ marginTop: 0 }}>Content for Tab 3</h3>
                        <p>This is the content of the third tab.</p>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export const StyledTabs = () => {
    const tabStyle = {
        padding: '12px 24px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: 500,
        color: '#666',
        borderBottom: '3px solid transparent',
        marginBottom: '-2px',
        transition: 'all 0.3s'
    };

    const activeTabStyle = {
        color: '#2196f3',
        borderBottomColor: '#2196f3'
    };

    return (
        <div style={{ padding: '20px' }}>
            <Tabs>
                <TabList style={{
                    display: 'flex',
                    gap: '8px',
                    borderBottom: '2px solid #e0e0e0',
                    marginBottom: '24px'
                }}>
                    {['Home', 'Profile', 'Settings', 'About'].map((label, i) => (
                        <Tab
                            key={i}
                            style={{
                                ...tabStyle,
                                ...(window.activeTab === i ? activeTabStyle : {})
                            }}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>
                <TabPanel>
                    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <h2 style={{ marginTop: 0, color: '#333' }}>🏠 Home</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            Welcome to the home section. This demonstrates a styled tabs component
                            with smooth transitions and custom colors.
                        </p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <h2 style={{ marginTop: 0, color: '#333' }}>👤 Profile</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            View and edit your profile information here.
                        </p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <h2 style={{ marginTop: 0, color: '#333' }}>⚙️ Settings</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            Configure your application preferences and settings.
                        </p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        <h2 style={{ marginTop: 0, color: '#333' }}>ℹ️ About</h2>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            Learn more about this application and its features.
                        </p>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export const WithDefaultTab = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Starts on Tab 2</h3>
            <Tabs defaultIndex={1}>
                <TabList style={{
                    display: 'flex',
                    gap: '4px',
                    borderBottom: '2px solid #e0e0e0',
                    marginBottom: '20px'
                }}>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        First
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Second (Default)
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Third
                    </Tab>
                </TabList>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                        Content 1
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                        Content 2 (This tab is active by default)
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
                        Content 3
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export const ControlledTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                    Current active tab: <strong>{activeTab}</strong>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => setActiveTab(0)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Go to Tab 0
                    </button>
                    <button
                        onClick={() => setActiveTab(1)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Go to Tab 1
                    </button>
                    <button
                        onClick={() => setActiveTab(2)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#ff9800',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Go to Tab 2
                    </button>
                </div>
            </div>

            <Tabs index={activeTab} onChange={setActiveTab}>
                <TabList style={{
                    display: 'flex',
                    gap: '4px',
                    borderBottom: '2px solid #e0e0e0',
                    marginBottom: '20px'
                }}>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Tab A
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Tab B
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Tab C
                    </Tab>
                </TabList>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                        Content A - You can control which tab is active using external buttons
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                        Content B - Try clicking the buttons above
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
                        Content C - The tab state is controlled by React state
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export const WithDisabledTab = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Tabs>
                <TabList style={{
                    display: 'flex',
                    gap: '4px',
                    borderBottom: '2px solid #e0e0e0',
                    marginBottom: '20px'
                }}>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Active Tab
                    </Tab>
                    <Tab
                        disabled
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'not-allowed',
                            opacity: 0.5
                        }}
                    >
                        Disabled Tab
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Another Active Tab
                    </Tab>
                </TabList>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        This tab is active and clickable
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        This tab is disabled and cannot be accessed
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        This is another active tab
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export const KeyboardNavigation = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h4 style={{ marginTop: 0 }}>⌨️ Keyboard Navigation</h4>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
                    <li><code>Tab</code> - Focus the tab list</li>
                    <li><code>Arrow Left/Right</code> - Navigate between tabs</li>
                    <li><code>Home</code> - Jump to first tab</li>
                    <li><code>End</code> - Jump to last tab</li>
                    <li><code>Enter/Space</code> - Activate focused tab</li>
                </ul>
            </div>

            <Tabs>
                <TabList style={{
                    display: 'flex',
                    gap: '4px',
                    borderBottom: '2px solid #e0e0e0',
                    marginBottom: '20px'
                }}>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        One
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Two
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Three
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Four
                    </Tab>
                    <Tab style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                        Five
                    </Tab>
                </TabList>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        Panel 1 - Try using keyboard to navigate
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        Panel 2
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        Panel 3
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        Panel 4
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        Panel 5 - Press Home to go back to the first tab
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};
