import {
  toast as ReactToast,
  ToastOptions,
  ToastPosition,
} from 'react-toastify';

const defaultOptions = {
  position: 'top-right' as ToastPosition,
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const toast = {
  error: (message: string, options?: ToastOptions<unknown>) =>
    ReactToast.error(message, options ?? defaultOptions),
  success: (message: string, options?: ToastOptions<unknown>) =>
    ReactToast.success(message, options ?? defaultOptions),
  warning: (message: string, options?: ToastOptions<unknown>) =>
    ReactToast.warning(message, options ?? defaultOptions),
};
