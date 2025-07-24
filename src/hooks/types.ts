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
  
  export interface UseDatabaseReturn {
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
    users: User[];
    totalUsers: number;
    getAllUsers: () => Promise<void>;
    getUserById: (id: string) => Promise<User | null>;
    getUserWithPosts: (id: string) => Promise<{ user: User | null; posts: Post[] }>;
    createPost: (userId: string, title: string, content: string) => Promise<Post | null>;
    deletePost: (postId: string) => Promise<boolean>;
    searchUsers: (searchTerm: string) => Promise<void>;
    getUsersWithPagination: (limit: number, offset: number) => Promise<void>;
    getTotalUsersCount: () => Promise<void>;
  }