import { useQuery } from '@tanstack/react-query';
import databaseService from '../../../../services/database';
import { ensureDatabaseInitialized } from '../../../../utils/database';

export const useGetUserWithPosts = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId, 'with-posts'],
    queryFn: async () => {
      await ensureDatabaseInitialized();
      return await databaseService.getUserWithPosts(userId);
    },
    enabled: !!userId,
  });
};
