# handy-tabs

Lightweight, accessible tabs component with keyboard navigation.

## Installation

```bash
npm install @handy-ones/handy-tabs
```

## Usage

### Basic Usage

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@handy-ones/handy-tabs';

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Content for Tab 1</TabPanel>
      <TabPanel>Content for Tab 2</TabPanel>
      <TabPanel>Content for Tab 3</TabPanel>
    </Tabs>
  );
}
```

### With Default Active Tab

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@handy-ones/handy-tabs';

function App() {
  return (
    <Tabs defaultIndex={1}>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Content for Tab 1</TabPanel>
      <TabPanel>Content for Tab 2</TabPanel>
      <TabPanel>Content for Tab 3</TabPanel>
    </Tabs>
  );
}
```

### Controlled Mode

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@handy-ones/handy-tabs';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs index={activeTab} onChange={setActiveTab}>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Content for Tab 1</TabPanel>
      <TabPanel>Content for Tab 2</TabPanel>
      <TabPanel>Content for Tab 3</TabPanel>
    </Tabs>
  );
}
```

### Custom Styling

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@handy-ones/handy-tabs';

function App() {
  return (
    <Tabs>
      <TabList className="my-tab-list">
        <Tab className="my-tab">Tab 1</Tab>
        <Tab className="my-tab">Tab 2</Tab>
      </TabList>
      <TabPanel className="my-panel">Content 1</TabPanel>
      <TabPanel className="my-panel">Content 2</TabPanel>
    </Tabs>
  );
}
```

## Accessibility

- Follows [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- Full keyboard navigation support:
  - `Tab`: Move focus into and out of tab list
  - `Arrow Left/Right`: Navigate between tabs
  - `Home/End`: Jump to first/last tab
  - `Enter/Space`: Activate focused tab
- Proper ARIA attributes (`role`, `aria-selected`, `aria-controls`, etc.)
- Screen reader friendly

## API

### `<Tabs>`

The main container component.

#### Props

- `defaultIndex?: number` - Default active tab index (uncontrolled mode)
- `index?: number` - Active tab index (controlled mode)
- `onChange?: (index: number) => void` - Callback when tab changes
- `className?: string` - CSS class for the container
- `children: ReactNode` - Tab list and panels

### `<TabList>`

Container for tab buttons.

#### Props

- `className?: string` - CSS class for the tab list
- `children: ReactNode` - Tab components

### `<Tab>`

Individual tab button.

#### Props

- `className?: string` - CSS class for the tab
- `disabled?: boolean` - Disable the tab
- `children: ReactNode` - Tab label content

### `<TabPanel>`

Content panel for a tab.

#### Props

- `className?: string` - CSS class for the panel
- `children: ReactNode` - Panel content

## License

MIT
