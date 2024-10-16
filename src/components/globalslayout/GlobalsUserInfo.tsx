"use client";

import React, { useEffect } from "react";
import Player from "../playlist/Player";
import FollowComponent from "../home/FollowComponent";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import { getAllUsers } from "@/services/auth/serverAction";
import ThemeBtn from "../theme/ThemeBtn";
import { useParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

const GlobalsUserInfo = () => {
  const { setAllUsers } = useAllUsersStore((state) => state);

  // 모든 유저 정보 zustand에 저장
  useEffect(() => {
    (async function () {
      getAllUsers().then(({ data }) => setAllUsers(data));
    })();
  }, []);
  return (
    <div>
      <Player />
      <FollowComponent />

      <ThemeBtn />
    </div>
  );
};

export default GlobalsUserInfo;
