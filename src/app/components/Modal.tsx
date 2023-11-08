import { Dialog } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { FC } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, className, children }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className={"relative z-50 text-black"}
      >
        <Dialog.Panel
          className={twMerge(
            "fixed inset-0 top-1/3 z-50 mx-auto h-fit max-w-lg rounded-lg bg-slate-300 p-4",
            className,
          )}
        >
          {children}
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Modal;
