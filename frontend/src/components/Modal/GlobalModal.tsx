import styled from "styled-components";
import { closeModal } from "../../store/reducers/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import BasicModal from "./BasicModal";
import DeleteMemberModal from "./DeleteMemberModal";

interface ModalComponent {
  type: string;
  component: JSX.Element;
}

interface RootState {
  modal: {
    modalType: string;
    isOpen: boolean;
  };
}

const MODAL_TYPES = {
  LoginModal: "LoginModal",
  BasicModal: "BasicModal",
  DeleteMemberModal: "DeleteMemberModal",
} as const;

const MODAL_COMPONENTS: ModalComponent[] = [
  {
    type: MODAL_TYPES.LoginModal,
    component: <LoginModal />,
  },
  {
    type: MODAL_TYPES.BasicModal,
    component: <BasicModal />,
  },
  {
    type: MODAL_TYPES.DeleteMemberModal,
    component: <DeleteMemberModal />,
  },
];

export default function GlobalModal() {
  const { modalType, isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };
  return (
    <Container>
      <Overlay onClick={() => dispatch(closeModal())} />
      {renderModal()}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 2;
`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
