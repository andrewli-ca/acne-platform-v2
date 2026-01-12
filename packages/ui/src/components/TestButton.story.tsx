import type { Meta, StoryObj } from '@storybook/react';
import { Heart, Plus, Send } from 'lucide-react';

import { TestButton } from './TestButton';

const meta = {
  title: 'Components/TestButton',
  component: TestButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'outline', 'subtle', 'default'],
    },
    color: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TestButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Default: Story = {
  args: {
    label: 'Click Me',
  },
};

// Button with different variants
export const Filled: Story = {
  args: {
    label: 'Filled Button',
    variant: 'filled',
    color: 'blue',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
    color: 'blue',
  },
};

export const Light: Story = {
  args: {
    label: 'Light Button',
    variant: 'light',
    color: 'blue',
  },
};

export const Subtle: Story = {
  args: {
    label: 'Subtle Button',
    variant: 'subtle',
    color: 'blue',
  },
};

// Buttons with different colors
export const Green: Story = {
  args: {
    label: 'Success',
    variant: 'filled',
    color: 'green',
  },
};

export const Red: Story = {
  args: {
    label: 'Danger',
    variant: 'filled',
    color: 'red',
  },
};

export const Yellow: Story = {
  args: {
    label: 'Warning',
    variant: 'filled',
    color: 'yellow',
  },
};

// Buttons with icons
export const WithLeftIcon: Story = {
  args: {
    label: 'Add Item',
    leftIcon: <Plus size={16} />,
    color: 'blue',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Send Message',
    rightIcon: <Send size={16} />,
    color: 'blue',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Like',
    leftIcon: <Heart size={16} />,
    rightIcon: <Heart size={16} />,
    color: 'pink',
  },
};

// Different sizes
export const ExtraSmall: Story = {
  args: {
    label: 'Extra Small',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    label: 'Extra Large',
    size: 'xl',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    label: 'Click Me!',
    onClick: () => alert('Button clicked!'),
  },
};
