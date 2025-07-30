import { useMutation, useQueryClient } from '@tanstack/react-query';
import databaseService from '../../../../services/database';
import type { Post, User } from '../../../../services/types';
import { ensureDatabaseInitialized } from '../../../../utils/database';
import { toast } from 'sonner';

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
    mutationFn: async (postId: string): Promise<Post | null> => {
      await ensureDatabaseInitialized();
      return await databaseService.deletePost(postId);
    },
    onSuccess: (deletedPost) => {
      if (deletedPost) {
        queryClient.invalidateQueries({ queryKey: ['user', deletedPost.user_id, 'with-posts'] });

        // Optimistically remove the post from any cached data if present
        queryClient.setQueryData(['user', deletedPost.user_id, 'with-posts'], (oldData: UserWithPosts | undefined) => {
          if (oldData) {
            return {
              ...oldData,
              posts: oldData.posts.filter((p) => p.id !== deletedPost.id),
            };
          }
          return oldData;
        });

        toast.success(`Successfully deleted post: ${deletedPost.title}`);
      }
    },
  });
};