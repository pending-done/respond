import React from "react";
import { Plus } from "lucide-react";

type PlaylistModalBtnProps = {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
};

const PlayListModalBtn = ({ setIsShowModal, isShowModal }: PlaylistModalBtnProps) => {
  /** 노래추가리스트 팝업창 이벤트 */
  const handleShowModal = () => {
    setIsShowModal((prevState: boolean) => !prevState);
  };

  return (
    <button
      onClick={handleShowModal}
      className={`duration-3000 flex h-[50px] w-[50px] transform items-center justify-center rounded-full border-[4px] border-black text-[30px] transition-transform ease-in-out hover:bg-[#000] hover:text-[#fff] ${isShowModal ? "rotate-45 bg-[#000] text-[#fff]" : "rotate-0 bg-[#fff] text-[#000]"}`}>
      <Plus />
    </button>
  );
};

export default PlayListModalBtn;
