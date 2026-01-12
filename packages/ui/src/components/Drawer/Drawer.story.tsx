import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { MoreVertical } from 'lucide-react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

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
  testId = 'drawer',
  ...props
}: Omit<DrawerProps, 'opened' | 'onClose'> & {
  defaultOpened?: boolean;
  children?: React.ReactNode;
}) {
  const [opened, setOpened] = useState(defaultOpened);

  return (
    <>
      <Box p="md">
        <Button onClick={() => setOpened(true)} data-testid="open-drawer-button">
          Open Drawer
        </Button>
      </Box>
      <Drawer opened={opened} onClose={() => setOpened(false)} testId={testId} {...props}>
        {children}
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <DrawerWrapper>
      <Stack gap="md">
        <Text>This is the default drawer with basic content.</Text>
        <Text size="sm" c="dimmed">
          You can resize it by dragging the left edge, collapse it, or make it full width.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer-button');

    // Test opening the drawer
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawer = within(document.body).getByTestId('drawer');
      expect(drawer).toBeInTheDocument();
    });

    // Test closing the drawer
    const drawerBody = within(document.body);
    const closeButton = drawerBody.getByTestId('close-drawer-button');
    await userEvent.click(closeButton);
    await waitFor(() => {
      const drawer = drawerBody.queryByTestId('drawer');
      expect(drawer).not.toBeVisible();
    });
  },
};

export const WithTitle: Story = {
  render: () => (
    <DrawerWrapper title="Drawer Title">
      <Stack gap="md">
        <Text>This drawer has a title in the header.</Text>
        <Text size="sm" c="dimmed">
          The title is displayed in the header section.
        </Text>
      </Stack>
    </DrawerWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer-button');

    // Open the drawer
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawer = within(document.body).getByTestId('drawer');
      expect(drawer).toBeInTheDocument();
    });

    // Test that the title is rendered correctly
    const drawerBody = within(document.body);
    const title = drawerBody.getByText('Drawer Title');
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
  },
};

export const CustomWidth: Story = {
  render: () => (
    <DrawerWrapper title="Custom Width Drawer" defaultWidth={600}>
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
    <DrawerWrapper title="Narrow Drawer" defaultWidth={300} minWidth={250}>
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
    <DrawerWrapper title="Wide Drawer" defaultWidth={800} maxWidth={1200}>
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
    <DrawerWrapper title="Long Content">
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
    <DrawerWrapper title="Form Drawer">
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer-button');

    // Open the drawer
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawer = within(document.body).getByTestId('drawer');
      expect(drawer).toBeInTheDocument();
    });

    // Test that the complex title (React node) is rendered correctly
    const drawerBody = within(document.body);
    const mainTitle = drawerBody.getByText('Complex Title');
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle).toBeVisible();

    const subtitle = drawerBody.getByText('With subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toBeVisible();
  },
};

export const WithoutTitle: Story = {
  render: () => (
    <DrawerWrapper>
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
    const [opened, setOpened] = useState(false);
    const [width] = useState(400);

    return (
      <>
        <Box p="md">
          <Stack gap="md">
            <Button onClick={() => setOpened(true)} data-testid="open-drawer-button">
              Open Drawer
            </Button>
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
          testId="interactive-drawer"
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer-button');

    // Open the drawer
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawer = within(document.body).getByTestId('interactive-drawer');
      expect(drawer).toBeInTheDocument();
    });

    // Get the drawer element from document body
    const drawerBody = within(document.body);
    const drawer = drawerBody.getByTestId('interactive-drawer') as HTMLElement;
    expect(drawer).toBeInTheDocument();

    // Test that the drawer has an initial width
    const initialWidth = drawer.offsetWidth;
    expect(initialWidth).toBeGreaterThan(0);

    // Test resizing by verifying the resize handle exists (only visible on larger screens)
    const resizeHandle = drawer.querySelector('[class*="resizeHandle"]');
    // Resize handle may not be visible on small screens, so we check conditionally
    if (window.innerWidth > 1024) {
      // On larger screens, resize handle should be present when drawer is not full width
      expect(resizeHandle).toBeInTheDocument();
    }

    // Test full width toggle button
    const fullWidthButton = drawerBody.queryByTestId('expand-drawer-button');
    if (fullWidthButton) {
      const initialWidthBeforeFull = drawer.offsetWidth;
      await userEvent.click(fullWidthButton);

      // Wait for drawer to expand to full width
      await waitFor(
        () => {
          const restoreButton = drawerBody.queryByTestId('expand-drawer-button');
          expect(restoreButton).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Verify drawer expanded (width should be larger or close to viewport width)
      const widthAfterFull = drawer.offsetWidth;
      expect(widthAfterFull).toBeGreaterThan(initialWidthBeforeFull);

      // Test restoring default width
      const restoreButton = drawerBody.getByTestId('expand-drawer-button');
      await userEvent.click(restoreButton);

      await waitFor(
        () => {
          const fullWidthButtonAgain = drawerBody.queryByTestId('expand-drawer-button');
          expect(fullWidthButtonAgain).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    }

    // Test closing the drawer
    const closeButton = drawerBody.getByTestId('close-drawer-button');
    await userEvent.click(closeButton);
    await waitFor(() => {
      const drawerAfterClose = drawerBody.queryByTestId('interactive-drawer');
      expect(drawerAfterClose).not.toBeVisible();
    });
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
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Controlled Drawer"
          testId="controlled-drawer"
        >
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
    const [opened, setOpened] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);

    return (
      <>
        <Box p="md">
          <Button onClick={() => setOpened(true)} data-testid="open-drawer-button">
            Open Drawer
          </Button>
        </Box>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Drawer with Ellipsis Menu"
          testId="ellipsis-drawer"
          topRightActions={
            <Menu opened={menuOpened} onChange={setMenuOpened} position="bottom-end">
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  title="More options"
                  data-testid="ellipsis-menu-button"
                >
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer-button');

    // Open the drawer
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawer = within(document.body).getByTestId('ellipsis-drawer');
      expect(drawer).toBeInTheDocument();
    });

    // Test that topRightActions (ellipsis menu) is rendered correctly
    const drawerBody = within(document.body);
    const ellipsisButton = drawerBody.getByTestId('ellipsis-menu-button');
    expect(ellipsisButton).toBeInTheDocument();

    // Click the ellipsis button to open the menu
    await userEvent.click(ellipsisButton);
    await waitFor(() => {
      // Check that menu items are visible
      const editItem = drawerBody.getByText('Edit');
      expect(editItem).toBeInTheDocument();
    });

    // Verify all menu items are present
    expect(drawerBody.getByText('Edit')).toBeInTheDocument();
    expect(drawerBody.getByText('Duplicate')).toBeInTheDocument();
    expect(drawerBody.getByText('Delete')).toBeInTheDocument();

    // Test closing the drawer
    const closeButton = drawerBody.getByTestId('close-drawer-button');
    await userEvent.click(closeButton);
    await waitFor(() => {
      const drawer = drawerBody.queryByTestId('ellipsis-drawer');
      expect(drawer).not.toBeVisible();
    });
  },
};

export const CloseOnEscapeOrClickOutside: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Box p="md">
          <Stack gap="md">
            <Button onClick={() => setOpened(true)} data-testid="open-drawer-button">
              Open Drawer
            </Button>
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
          testId="escape-click-drawer"
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer-button');

    // Open the drawer
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawer = within(document.body).getByTestId('escape-click-drawer');
      expect(drawer).toBeInTheDocument();
    });

    const drawerBody = within(document.body);
    const drawer = drawerBody.getByTestId('escape-click-drawer') as HTMLElement;
    expect(drawer).toBeInTheDocument();

    // Test closing with Escape key
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      const drawerAfterEscape = drawerBody.queryByTestId('escape-click-drawer');
      expect(drawerAfterEscape).not.toBeVisible();
    });

    // Reopen drawer for click outside test
    await userEvent.click(openButton);
    await waitFor(() => {
      const drawerReopened = drawerBody.getByTestId('escape-click-drawer');
      expect(drawerReopened).toBeInTheDocument();
    });

    // Test closing by clicking outside (on the backdrop)
    // Click on the body/background area
    const backdrop = document.body.querySelector('[class*="mantine-Drawer-overlay"]');
    if (backdrop) {
      await userEvent.click(backdrop);
      await waitFor(() => {
        const drawerAfterClick = drawerBody.queryByTestId('escape-click-drawer');
        expect(drawerAfterClick).not.toBeVisible();
      });
    }
  },
};
