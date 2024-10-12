"use client";

import PlaylistAll from "@/components/playlist/PlaylistAll";
import React, { useEffect, useState } from "react";

const Playlist = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const [playList, setPlayList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false); //디폴트 안보이게

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret
          })
        });

        if (!tokenRes.ok) {
          throw new Error("토큰 가져오기 실패");
        }

        const { access_token } = await tokenRes.json(); // 토큰 추출해서access_token 변수애 저장

        // Spotify API에 데이터 요청
        const spotifyRes = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbJZGli0rRP3r", {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        if (!spotifyRes.ok) {
          throw new Error("스포티파이 데이터 패치 실패");
        }

        const data = await spotifyRes.json();
        // console.log("data", data);
        // console.log("data.tracks.items", data.tracks.items);
        setPlayList(data.tracks.items);
        return data;
      } catch (error) {
        throw error;
      }
    };
    fetchSpotifyData();
  }, [clientId, clientSecret]);

  /** 노래추가리스트 팝업창 이벤트 */
  const handleShowModal = () => {
    setIsShowModal(true);
  };

  return (
    <div className="relative h-full w-full">
      <div className="item-center flex justify-between">
        <h1 className="pageTitle">플레이리스트</h1>
        <button
          onClick={handleShowModal}
          className={`duration-3000 h-[50px] w-[50px] transform rounded-full border-[4px] border-black text-[30px] transition-transform ease-in-out hover:bg-[#000] hover:text-[#fff] ${isShowModal ? "rotate-45 bg-[#000] text-[#fff]" : "rotate-0 bg-[#fff] text-[#000]"}`}>
          +
        </button>
      </div>
      {isShowModal && <PlaylistAll playlist={playList} setIsShowModal={setIsShowModal} />}
      {/* 임시 */}
      <div className="grid grid-cols-3 gap-4">
        {playList.map((list) => (
          <div key={list.track.id}>
            <img src={list.track.album.images[0].url} alt={list.track.name} className="border-[4px] border-black" />
            <div>{list.track.name}</div>
            <div>{list.track.artists[0].name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
