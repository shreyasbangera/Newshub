import toast from 'react-hot-toast';

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
  });
}