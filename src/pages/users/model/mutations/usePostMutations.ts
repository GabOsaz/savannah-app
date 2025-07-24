import { useMutation, useQueryClient } from '@tanstack/react-query';
import databaseService from '../../../../services/database';
import type { Post, User } from '../../../../services/types';
import { ensureDatabaseInitialized } from '../../../../utils/database';

interface UserWithPosts {
  user: User | null;
  posts: Post[];
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, title, content }: { userId: string; title: string; content: string }) => {
      await ensureDatabaseInitialized();
      return await databaseService.createPost(userId, title, content);
    },
    onSuccess: (newPost, { userId }) => {
      // Invalidate and refetch user posts
      queryClient.invalidateQueries({ queryKey: ['user', userId, 'with-posts'] });
      
      // Optimistically update the cache
      queryClient.setQueryData(['user', userId, 'with-posts'], (oldData: UserWithPosts | undefined) => {
        if (oldData && newPost) {
          return {
            ...oldData,
            posts: [newPost, ...oldData.posts]
          };
        }
        return oldData;
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await ensureDatabaseInitialized();
      return await databaseService.deletePost(postId);
    },
    onSuccess: (success) => {
      if (success) {
        // Invalidate all user queries to refetch data
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};