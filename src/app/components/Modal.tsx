import type { FC } from "react";
import { Modal as FlowModal, type ModalSizes, } from 'flowbite-react'


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // className?: React.ComponentProps<"div">["className"];
  header: string,
  size?: keyof ModalSizes
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, size, header, children }) => {
  return (
    <>
      <FlowModal show={isOpen} onClose={onClose} dismissible size={size}>
        <FlowModal.Header>{header}</FlowModal.Header>
        <FlowModal.Body >
          {children}
        </FlowModal.Body>
      </FlowModal>
    </>
  );
};

export default Modal;
