"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpotifyTrack } from "@/types/playlist/Spotify";
import browserClient from "@/utils/supabase/client";
import PlaylistSearch from "./PlaylistSearch";

type SpotifyListProps = {
  track: SpotifyTrack;
};
type PlaylistAllProps = {
  playlist: SpotifyListProps[];
  myPlayList: SpotifyListProps[];
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
//TODO : 플레이리스트 추가시 중복된거 고쳐야함
const PlaylistAll = ({ playlist, setIsShowModal, myPlayList }: PlaylistAllProps) => {
  const [search, setSearch] = useState<string>("");
  console.log("myPlayList", myPlayList);
  /** 플레이리스트 추가이벤트 */
  const handleAddPlayList = async (track: SpotifyTrack) => {
    console.log("track", track);
    if (!myPlayList.some((list) => list.track?.id === track.id)) {
      try {
        const { data: user, error: authError } = await browserClient.auth.getUser();
        if (authError) {
          console.error("사용자 인증 오류:", authError);
          return;
        }
        if (!user) {
          console.error("로그인한 유저가 없습니다.");
          return;
        }
        console.log("user", user);
        const { data, error } = await browserClient.from("playlist").insert({
          track_id: track.id,
          track_name: track.name,
          artist_name: track.artists[0].name,
          user_id: user?.user?.id,
          album_image: track.album.images[0]?.url
        });
        if (error) {
          console.error("추가중 오류 발생:", error);
        } else {
          alert("플레이리스트에 추가되었습니다"); //토스트로 추후 변경
        }
      } catch (error) {
        console.error("그 외 에러:", error);
      }
    } else {
      alert("이미 플레이리스트에 존재하는 트랙입니다.");
    }
  };

  //검색어 따른 필터링리스트(제목,가수이름)
  const filterPlaylist = playlist.filter(
    (list) =>
      list.track.name.toLowerCase().includes(search.toLowerCase()) ||
      list.track.artists[0].name.toLowerCase().includes(search.toLowerCase())
  );

  //팝업창 닫기이벤트
  const handleCloseModal = () => {
    setIsShowModal((prevState: boolean) => !prevState);
  };

  return (
    <div className="relative">
      <div className="borderline fixed left-1/2 top-1/2 flex h-[600px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[5px] overflow-scroll !pt-0">
        <div className="sticky top-[0px] flex flex-col items-end bg-[#fff] pt-[20px]">
          <button onClick={handleCloseModal} className="">
            닫기icon
          </button>
          <PlaylistSearch setSearch={setSearch} />
        </div>
        <div className="flex flex-col gap-[10px] border-[1px] border-[#DBDBDB] bg-[#FAFAFA] p-[20px]">
          {filterPlaylist.length === 0 ? (
            <span className="text-[13px] text-[#5C5C5C]">{`"${search}"에 대한 노래를 찾을 수 없습니다.`}</span>
          ) : (
            (search ? filterPlaylist : playlist).map((list: SpotifyListProps) => (
              <div key={list.track.id} className="flex items-center gap-[10px]">
                <Image src={list.track.album.images[0].url} alt={list.track.name} width="100" height="100" />
                <div className="flex-1">
                  <div>{list.track.name}</div>
                  <div>{list.track.artists[0].name}</div>
                </div>
                <button className="btn h-[40px]" onClick={() => handleAddPlayList(list.track)}>
                  +
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistAll;
