import React, { createContext, useContext, useState, useRef, ReactNode, CSSProperties } from 'react';

interface TabsContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerTab: () => number;
  registerPanel: () => number;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
}

interface TabsProps {
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Tabs({ defaultIndex = 0, index, onChange, className, style, children }: TabsProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const tabCounterRef = useRef(0);
  const panelCounterRef = useRef(0);

  const isControlled = index !== undefined;
  const activeIndex = isControlled ? index : uncontrolledIndex;

  const setActiveIndex = (newIndex: number) => {
    if (!isControlled) {
      setUncontrolledIndex(newIndex);
    }
    onChange?.(newIndex);
  };

  const registerTab = () => {
    const id = tabCounterRef.current;
    tabCounterRef.current += 1;
    return id;
  };

  const registerPanel = () => {
    const id = panelCounterRef.current;
    panelCounterRef.current += 1;
    return id;
  };

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex, registerTab, registerPanel }}>
      <div className={className} style={style}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function TabList({ className, style, children }: TabListProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const tabs = tabListRef.current?.querySelectorAll('[role="tab"]:not([disabled])');
    if (!tabs || tabs.length === 0) return;

    const currentIndex = Array.from(tabs).indexOf(event.target as HTMLElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    (tabs[nextIndex] as HTMLElement).focus();
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      className={className}
      style={style}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

interface TabProps {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  children: ReactNode;
}

export function Tab({ className, style, disabled, children }: TabProps) {
  const { activeIndex, setActiveIndex, registerTab } = useTabsContext();
  const [tabIndex] = useState(() => registerTab());
  const isActive = activeIndex === tabIndex;

  const handleClick = () => {
    if (!disabled) {
      setActiveIndex(tabIndex);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveIndex(tabIndex);
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${tabIndex}`}
      id={`tab-${tabIndex}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={className}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function TabPanel({ className, style, children }: TabPanelProps) {
  const { activeIndex, registerPanel } = useTabsContext();
  const [panelIndex] = useState(() => registerPanel());
  const isActive = activeIndex === panelIndex;

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${panelIndex}`}
      id={`panel-${panelIndex}`}
      hidden={!isActive}
      className={className}
      style={style}
    >
      {isActive && children}
    </div>
  );
}
