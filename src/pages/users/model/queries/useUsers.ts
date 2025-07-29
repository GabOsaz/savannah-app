import { useQuery } from '@tanstack/react-query';
import databaseService from '../../../../services/database';
import { ensureDatabaseInitialized } from '../../../../utils/database';

export const useGetUsers = (page: number = 1, searchTerm: string = '', limit: number = 4) => {
  return useQuery({
    queryKey: ['users', page, searchTerm, limit],
    queryFn: async () => {
      await ensureDatabaseInitialized();
      
      const offset = (page - 1) * limit;

      if (searchTerm.trim()) {
        return await databaseService.searchUsers(searchTerm, limit, offset);
      } else {
        return await databaseService.getUsersWithPagination(limit, offset);
      }
    },
    enabled: true,
  });
};

export const useGetTotalUsersCount = (searchTerm: string = '') => {
  return useQuery({
    queryKey: ['users', 'count', searchTerm],
    queryFn: async () => {
      await ensureDatabaseInitialized();
      return await databaseService.getTotalUsersCount(searchTerm);
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