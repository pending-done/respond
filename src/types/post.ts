export type Post = {
  id: number;
  user_id: string;
  nickname: string;
  title: string;
  content: string;
  created_at: string;
  board_img?: Array<{ img_url: string }>;
};

export type NewPost = Omit<Post, "id" | "created_at" | "img_url?">;

export type PostImage = {
  user_id: string;
  board_id: number;
  publicUrl: string;
};

export type ModifyPost = Pick<Post, "id" | "content">;
