import databaseService from '../services/database';

/**
 * Ensures the database is initialized before performing any operations.
 * This function checks if the database is ready and initializes it if needed.
 */
export const ensureDatabaseInitialized = async (): Promise<void> => {
  try {
    // Try to get table names - this will fail if database is not initialized
    await databaseService.getTableNames();
  } catch {
    // If database is not initialized, initialize it
    await databaseService.initialize();
  }
}; 