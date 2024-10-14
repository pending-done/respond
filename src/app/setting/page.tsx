"use client";

import React from "react";
import SettingPrivacy from "./components/SettingPrivacy";
import { getSetting } from "./server-action/settingAction";
import { useQuery } from "@tanstack/react-query";
import { Setting } from "@/types/setting";
import queryKey from "@/queries/queryKey";
import SettingShowList from "./components/SettingShowList";
import SettingTabList from "./components/SettingTabList";
import browserClient from "@/utils/supabase/client";
import { useLoggedIn } from "@/hooks/useLoggedIn";

const testUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

const page = () => {
  // const { data: userId } = useQuery<string | undefined>({
  //   queryKey: queryKey.auth.loginUser,
  //   queryFn: async () => {
  //     const { data: loginUserId } = await browserClient.auth.getUser();
  //     const userId = loginUserId?.user?.id;

  //     return userId;
  //   }
  // });
  const { userInfo } = useLoggedIn();
  console.log("userInfo", userInfo);

  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(testUserId),
    enabled: !!userId
  });

  if (!setting) {
    return <></>;
  }

  return (
    <div>
      <SettingPrivacy setting={setting}></SettingPrivacy>
      <SettingShowList setting={setting}></SettingShowList>
      <SettingTabList setting={setting}></SettingTabList>
    </div>
  );
};

export default page;
