import { Dispatch, SetStateAction, useState } from 'react';
import Login from '../login';
import Register from '../register';
import { Dialog, DialogContent } from '@modules/common/components/ui/dialog';

export enum LOGIN_VIEW {
  LOGIN = 'login',
  REGISTER = 'register',
}

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};   

export default function LoginModal({ open, setOpen }: Props) {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.LOGIN);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='px-12 py-8'>
        {currentView === LOGIN_VIEW.LOGIN ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </DialogContent>
    </Dialog>
  );
}
