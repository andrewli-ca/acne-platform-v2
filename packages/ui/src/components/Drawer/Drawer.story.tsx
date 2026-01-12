import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { MoreVertical } from 'lucide-react';

import { ActionIcon, Box, Button, Divider, Menu, Stack, Text } from '@mantine/core';

import { Drawer, type DrawerProps } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A resizable drawer component that opens from the right. Supports collapse, full-width, and drag-to-resize functionality. On small screens, opens full screen and hides resize controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: 'boolean',
      description: 'Whether the drawer is open',
    },
    title: {
      control: 'text',
      description: 'Title to display in the drawer header',
    },
    defaultWidth: {
      control: 'number',
      description: 'Default width of the drawer in pixels (default: 400px)',
    },
    minWidth: {
      control: 'number',
      description: 'Minimum width of the drawer in pixels (default: 200px)',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width of the drawer in pixels (default: 90% of viewport)',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when drawer should close',
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

// Helper component to manage drawer state
function DrawerWrapper({
  defaultOpened = false,
  children,
  ...props
}: Omit<DrawerProps, 'opened' | 'onClose'> & {
  defaultOpened?: boolean;
  children?: React.ReactNode;
}) {
  const [opened, setOpened] = useState(defaultOpened);

  return (
    <>
      <Box p="md">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Box>
      <Drawer opened={opened} onClose={() => setOpened(false)} {...props}>
        {children}
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <DrawerWrapper defaultOpened>
      <Stack gap="md">
        <Text>This is the default drawer with basic content.</Text>
        <Text size="sm" c="dimmed">
          You can resize it by dragging the left edge, collapse it, or make it full width.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <DrawerWrapper defaultOpened title="Drawer Title">
      <Stack gap="md">
        <Text>This drawer has a title in the header.</Text>
        <Text size="sm" c="dimmed">
          The title is displayed in the header section.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <DrawerWrapper defaultOpened title="Custom Width Drawer" defaultWidth={600}>
      <Stack gap="md">
        <Text>This drawer has a custom default width of 600px.</Text>
        <Text size="sm" c="dimmed">
          You can still resize it, but it starts wider than the default.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const NarrowDrawer: Story = {
  render: () => (
    <DrawerWrapper defaultOpened title="Narrow Drawer" defaultWidth={300} minWidth={250}>
      <Stack gap="md">
        <Text>This drawer has a narrower default width of 300px.</Text>
        <Text size="sm" c="dimmed">
          The minimum width is set to 250px.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const WideDrawer: Story = {
  render: () => (
    <DrawerWrapper defaultOpened title="Wide Drawer" defaultWidth={800} maxWidth={1200}>
      <Stack gap="md">
        <Text>This drawer has a wider default width of 800px.</Text>
        <Text size="sm" c="dimmed">
          The maximum width is set to 1200px.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <DrawerWrapper defaultOpened title="Long Content">
      <Stack gap="md">
        <Text fw={600}>Scrollable Content</Text>
        <Text size="sm" c="dimmed">
          This drawer contains content that will scroll if it exceeds the drawer height.
        </Text>
        <Divider />
        {Array.from({ length: 50 }, (_, i) => (
          <Box
            key={i}
            p="xs"
            style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 4 }}
          >
            <Text size="sm">Item {i + 1}</Text>
            <Text size="xs" c="dimmed">
              This is item number {i + 1} in a long list of items.
            </Text>
          </Box>
        ))}
      </Stack>
    </DrawerWrapper>
  ),
};

export const WithFormContent: Story = {
  render: () => (
    <DrawerWrapper defaultOpened title="Form Drawer">
      <Stack gap="md">
        <Text>This drawer contains form-like content.</Text>
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 4 }}>
          <Stack gap="sm">
            <Text size="sm" fw={500}>
              Form Section
            </Text>
            <Text size="xs" c="dimmed">
              This could be a form or settings panel.
            </Text>
          </Stack>
        </Box>
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 4 }}>
          <Stack gap="sm">
            <Text size="sm" fw={500}>
              Another Section
            </Text>
            <Text size="xs" c="dimmed">
              Additional content sections can be added here.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </DrawerWrapper>
  ),
};

export const WithComplexTitle: Story = {
  render: () => (
    <DrawerWrapper
      defaultOpened
      title={
        <Stack gap={2}>
          <Text size="lg" fw={600}>
            Complex Title
          </Text>
          <Text size="xs" c="dimmed">
            With subtitle
          </Text>
        </Stack>
      }
    >
      <Stack gap="md">
        <Text>The title can be a React node, allowing for complex header layouts.</Text>
        <Text size="sm" c="dimmed">
          This is useful for displaying additional information in the header.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <DrawerWrapper defaultOpened>
      <Stack gap="md">
        <Text>This drawer doesn't have a title.</Text>
        <Text size="sm" c="dimmed">
          The header will still show the control buttons (collapse, full width, close).
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);
    const [width] = useState(400);

    return (
      <>
        <Box p="md">
          <Stack gap="md">
            <Button onClick={() => setOpened(true)}>Open Drawer</Button>
            <Text size="sm" c="dimmed">
              Current width: {width}px
            </Text>
          </Stack>
        </Box>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Interactive Drawer"
          defaultWidth={width}
        >
          <Stack gap="md">
            <Text>This drawer demonstrates interactive features:</Text>
            <Text size="sm" c="dimmed">
              • Drag the left edge to resize
              <br />• Click the minimize icon to collapse
              <br />• Click the maximize icon for full width
              <br />• Click the X to close
            </Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Box p="md">
          <Stack gap="md">
            <Button onClick={() => setOpened(!opened)}>{opened ? 'Close' : 'Open'} Drawer</Button>
            <Text size="sm" c="dimmed">
              Drawer is {opened ? 'open' : 'closed'}
            </Text>
          </Stack>
        </Box>
        <Drawer opened={opened} onClose={() => setOpened(false)} title="Controlled Drawer">
          <Stack gap="md">
            <Text>This drawer is controlled by external state.</Text>
            <Text size="sm" c="dimmed">
              The open/close state is managed by the parent component.
            </Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const WithEllipsisAction: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);
    const [menuOpened, setMenuOpened] = useState(false);

    return (
      <>
        <Box p="md">
          <Button onClick={() => setOpened(true)}>Open Drawer</Button>
        </Box>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Drawer with Ellipsis Menu"
          topRightActions={
            <Menu opened={menuOpened} onChange={setMenuOpened} position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray" title="More options">
                  <MoreVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.Item color="red">Delete</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          }
        >
          <Stack gap="md">
            <Text>This drawer includes an ellipsis menu in the top right corner.</Text>
            <Text size="sm" c="dimmed">
              Click the three dots icon to see the menu options.
            </Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const CloseOnEscapeOrClickOutside: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);

    return (
      <>
        <Box p="md">
          <Stack gap="md">
            <Button onClick={() => setOpened(true)}>Open Drawer</Button>
            <Text size="sm" c="dimmed">
              This drawer will close when you:
              <br />• Press the Escape key
              <br />• Click outside the drawer
            </Text>
          </Stack>
        </Box>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Close on Escape or Click Outside"
          closeOnFocusOutside
        >
          <Stack gap="md">
            <Text>This drawer can be closed by pressing Escape or clicking outside.</Text>
            <Text size="sm" c="dimmed">
              Try pressing the Escape key or clicking on the background to close this drawer.
            </Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};
