export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}

export interface TableInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
}
