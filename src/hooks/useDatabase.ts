import { useState, useEffect, useCallback } from 'react';
import databaseService from '../services/database';
import type { User, Post, UseDatabaseReturn } from './types';

export const useDatabase = (): UseDatabaseReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Initialize database on mount
  useEffect(() => {
    const initDatabase = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await databaseService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize database');
      } finally {
        setIsLoading(false);
      }
    };

    initDatabase();

    // Cleanup on unmount
    return () => {
      databaseService.close();
    };
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await databaseService.getAllUsers();
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (id: string): Promise<User | null> => {
    try {
      setError(null);
      return await databaseService.getUserById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
      return null;
    }
  }, []);

  const getUserWithPosts = useCallback(async (id: string): Promise<{ user: User | null; posts: Post[] }> => {
    try {
      setError(null);
      return await databaseService.getUserWithPosts(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user and posts');
      return { user: null, posts: [] };
    }
  }, []);

  const createPost = useCallback(async (userId: string, title: string, content: string): Promise<Post | null> => {
    try {
      setError(null);
      return await databaseService.createPost(userId, title, content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      return null;
    }
  }, []);

  const deletePost = useCallback(async (postId: string): Promise<boolean> => {
    try {
      setError(null);
      return await databaseService.deletePost(postId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      return false;
    }
  }, []);

  const searchUsers = useCallback(async (searchTerm: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await databaseService.searchUsers(searchTerm);
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUsersWithPagination = useCallback(async (limit: number, offset: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await databaseService.getUsersWithPagination(limit, offset);
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTotalUsersCount = useCallback(async () => {
    try {
      setError(null);
      const count = await databaseService.getTotalUsersCount();
      setTotalUsers(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get total users count');
    }
  }, []);

  return {
    isInitialized,
    isLoading,
    error,
    users,
    totalUsers,
    getAllUsers,
    getUserById,
    getUserWithPosts,
    createPost,
    deletePost,
    searchUsers,
    getUsersWithPagination,
    getTotalUsersCount,
  };
}; 