import { CanDeactivateFn } from '@angular/router';
import { CanLeave } from './canLeave.interface';

export const canLeaveGuard: CanDeactivateFn<CanLeave> =
  (
    component,
    currentRoute,
    currentState,
    nextState
  ) => {
  if (!component.canLeave()) {
    return confirm('Are you sure you want to leave ?');
  }
  return true;
};
