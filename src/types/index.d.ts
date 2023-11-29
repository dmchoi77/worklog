import { Step } from '~/pages';

declare global {
  interface Window {
    debuggerCallback: (step: Step) => void;
  }
  
}
