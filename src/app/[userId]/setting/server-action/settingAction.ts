"use server";
import { createClient } from "@/utils/supabase/server";
import { PrivacyType, Setting, ShowList, TabList } from "@/types/setting";

const getSetting = async (userId: string) => {
  const supabase = createClient();
  const { data: setting, error: isSettingError } = await supabase
    .from("setting")
    .select()
    .eq("user_id", userId)
    .returns<Setting[]>();

  if (isSettingError) {
    throw new Error("setting select Error");
  }

  return setting[0];
};

const patchPrivacy = async ({ userId, privacyType }: { userId: string; privacyType: PrivacyType }) => {
  const supabase = createClient();
  const { error } = await supabase.from("setting").update({ privacy_type: privacyType }).eq("user_id", userId);

  if (error) {
    throw new Error("privacy_type update Error");
  }
};

const patchShowList = async ({ userId, showList }: { userId: string; showList: ShowList[] }) => {
  const supabase = createClient();
  const { error } = await supabase.from("setting").update({ show_list: showList }).eq("user_id", userId);

  if (error) {
    throw new Error("show_list update Error");
  }
};

const patchTabList = async ({ userId, tabList }: { userId: string; tabList: TabList[] }) => {
  const supabase = createClient();
  const { error } = await supabase.from("setting").update({ tab_list: tabList }).eq("user_id", userId);

  if (error) {
    throw new Error("tab_list update Error");
  }
};

/** 회원가입 시 setting에 기본값 추가 */
const generateDefaultSetting = async (userId: string) => {
  const supabase = createClient();
  const defaultSetting: Partial<Setting> = {
    user_id: userId,
    theme_name: "default",
    show_list: ["board"],
    tab_list: ["board", "chat", "playlist", "schedule"],
    privacy_type: "public"
  };
  const { error } = await supabase.from("setting").insert(defaultSetting);

  if (error) {
    throw new Error("setting 생성 실패");
  }
};

export { getSetting, patchPrivacy, patchShowList, patchTabList, generateDefaultSetting };
