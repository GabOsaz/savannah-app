import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';
import type { User, Post, TableInfo } from './types';

class DatabaseService {
  private db: Database | null = null;
  private sql: SqlJsStatic | null = null;

  async initialize(): Promise<void> {
    try {
      // Initialize sql.js
      this.sql = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`
      });

      // Load the database file
      const response = await fetch('/data.db');
      const arrayBuffer = await response.arrayBuffer();
      
      // Create database instance
      this.db = new this.sql.Database(new Uint8Array(arrayBuffer));
          } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async query(sql: string, params: (string | number)[] = []): Promise<Record<string, unknown>[]> {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }

    try {
      const stmt = this.db.prepare(sql);
      stmt.bind(params);
      
      const results: Record<string, unknown>[] = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      
      stmt.free();
      return results;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async getTableNames(): Promise<string[]> {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }

    const result = await this.query(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    return result.map(row => row.name as string);
  }

  async getTableSchema(tableName: string): Promise<TableInfo[]> {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }

    const result = await this.query(`PRAGMA table_info(${tableName})`);
    return result as unknown as TableInfo[];
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.username as role,
        COALESCE(
          a.street || ', ' || a.city || ', ' || a.state || ' ' || a.zipcode,
          'No address available'
        ) as address
      FROM users u
      LEFT JOIN addresses a ON u.id = a.user_id
    `);
    return result as unknown as User[];
  }

  async getUserById(id: string): Promise<User | null> {
    const results = await this.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.username as role,
        COALESCE(
          a.street || ', ' || a.city || ', ' || a.state || ' ' || a.zipcode,
          'No address available'
        ) as address
      FROM users u
      LEFT JOIN addresses a ON u.id = a.user_id
      WHERE u.id = ?
    `, [id]);
    return results[0] as unknown as User || null;
  }

  async getUserWithPosts(id: string): Promise<{ user: User | null; posts: Post[] }> {
    // First get the user
    const user = await this.getUserById(id);
    
    // Check if posts table exists and get its schema
    try {
      const tableNames = await this.getTableNames();
      // console.log('Available tables:', tableNames);
      
      if (tableNames.includes('posts')) {
        
        // Build query based on actual columns
        const posts = await this.query(`
          SELECT 
            p.id,
            p.title,
            p.body as content,
            p.user_id,
            p.created_at
          FROM posts p
          WHERE p.user_id = ?
          ORDER BY p.created_at DESC
        `, [id]);
        
        return {
          user,
          posts: posts as unknown as Post[]
        };
      } else {
        return {
          user,
          posts: []
        };
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        user,
        posts: []
      };
    }
  }

  async createPost(userId: string, title: string, content: string): Promise<Post | null> {
    try {
      const tableNames = await this.getTableNames();
      
      if (!tableNames.includes('posts')) {
        return null;
      }

      // Generate a unique UUID for the new post ID to ensure uniqueness and non-null value
      const newId = crypto.randomUUID();

      // Insert new post with explicit UUID id
      await this.query(`
        INSERT INTO posts (id, user_id, title, body, created_at)
        VALUES (?, ?, ?, ?, datetime('now'))
      `, [newId, userId, title, content]);

      // Fetch the freshly inserted post by its id
      const newPost = await this.query(`
        SELECT 
          id,
          title,
          body as content,
          user_id,
          created_at
        FROM posts
        WHERE id = ?
        LIMIT 1
      `, [newId]);

      return newPost[0] as unknown as Post || null;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  }

  async deletePost(postId: string): Promise<boolean> {
    try {
      await this.query(`
        DELETE FROM posts WHERE id = ?
      `, [postId]);
      
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  }

  async searchUsers(searchTerm: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    const result = await this.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.username as role,
        COALESCE(
          a.street || ', ' || a.city || ', ' || a.state || ' ' || a.zipcode,
          'No address available'
        ) as address
      FROM users u
      LEFT JOIN addresses a ON u.id = a.user_id
      WHERE u.name LIKE ? OR u.email LIKE ?
      ORDER BY u.name ASC
      LIMIT ? OFFSET ?
    `, [`%${searchTerm}%`, `%${searchTerm}%`, limit, offset]);
    return result as unknown as User[];
  }

  async getUsersWithPagination(limit: number, offset: number): Promise<User[]> {
    const result = await this.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.username as role,
        COALESCE(
          a.street || ', ' || a.city || ', ' || a.state || ' ' || a.zipcode,
          'No address available'
        ) as address
      FROM users u
      LEFT JOIN addresses a ON u.id = a.user_id
      ORDER BY u.name ASC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return result as unknown as User[];
  }

  async getTotalUsersCount(searchTerm: string = ''): Promise<number> {
    let result: Record<string, unknown>[];

    if (searchTerm.trim()) {
      result = await this.query(
        `SELECT COUNT(*) as count FROM users WHERE name LIKE ? OR email LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
    } else {
      result = await this.query('SELECT COUNT(*) as count FROM users');
    }

    return (result[0]?.count as number) || 0;
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Create a singleton instance
const databaseService = new DatabaseService();
export default databaseService;