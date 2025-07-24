import { useQuery } from '@tanstack/react-query';
import databaseService from '../../../../services/database';
import { ensureDatabaseInitialized } from '../../../../utils/database';

export const useGetUsers = (page: number = 1, searchTerm: string = '', limit: number = 4) => {
  return useQuery({
    queryKey: ['users', page, searchTerm, limit],
    queryFn: async () => {
      await ensureDatabaseInitialized();
      
      if (searchTerm.trim()) {
        return await databaseService.searchUsers(searchTerm);
      } else {
        const offset = (page - 1) * limit;
        return await databaseService.getUsersWithPagination(limit, offset);
      }
    },
    enabled: true,
  });
};

export const useGetTotalUsersCount = () => {
  return useQuery({
    queryKey: ['users', 'count'],
    queryFn: async () => {
      await ensureDatabaseInitialized();
      return await databaseService.getTotalUsersCount();
    },
    enabled: true,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users', 'all'],
    queryFn: async () => {
      await ensureDatabaseInitialized();
      return await databaseService.getAllUsers();
    },
    enabled: true,
  });
}; 