import { Meta, StoryFn } from '@storybook/react';
import { AlertDialog } from './AlertDialog';
import { AlertDialogPortal } from './AlertDialogPortal';
import { useAlertDialogStore } from '~/stores/useAlertDialogStore';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/molecules/AlerDialog',
  component: AlertDialog,
  args: {
    actionText: '확인',
    cancelText: '취소',
    description: '설명',
    title: '제목',
  },

  decorators: [
    (Story) => (
      <div className='flex justify-center items-center h-screen'>
        <Story />
        <AlertDialogPortal />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryFn<typeof AlertDialog> = (args) => {
  const { closeDialog } = useAlertDialogStore();

  return (
    <div>
      <AlertDialog {...args} onConfirm={() => closeDialog()} />
    </div>
  );
};
