# SQLite Database Integration with sql.js

This project demonstrates how to access a SQLite database directly from the frontend using the `sql.js` library. This approach allows you to perform database operations entirely in the browser without needing a backend server.

## Features

- ✅ **Client-side SQLite database access** using sql.js
- ✅ **TypeScript support** with proper type definitions
- ✅ **React hooks** for easy database integration
- ✅ **Pagination** support for large datasets
- ✅ **Search functionality** across user data
- ✅ **Error handling** and loading states
- ✅ **Database explorer** component for testing queries

## Setup

### 1. Database File

The SQLite database file (`data.db`) is located in the `public/` folder so it can be accessed by the frontend. The database contains a `users` table with the following structure:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  address TEXT
);
```

### 2. Dependencies

The following packages are installed:

```bash
npm install sql.js
npm install --save-dev @types/sql.js
```

## Usage

### Database Service

The main database service is located at `src/services/database.ts`:

```typescript
import databaseService from '../services/database';

// Initialize the database
await databaseService.initialize();

// Query users
const users = await databaseService.getAllUsers();

// Search users
const results = await databaseService.searchUsers('john');

// Get user by ID
const user = await databaseService.getUserById(1);

// Pagination
const users = await databaseService.getUsersWithPagination(10, 0);

// Custom queries
const result = await databaseService.query('SELECT * FROM users WHERE role = ?', ['Admin']);
```

### React Hook

Use the `useDatabase` hook for React components:

```typescript
import { useDatabase } from '../hooks/useDatabase';

function MyComponent() {
  const {
    isInitialized,
    isLoading,
    error,
    users,
    totalUsers,
    getAllUsers,
    searchUsers,
    getUsersWithPagination,
  } = useDatabase();

  // The hook automatically initializes the database
  // and provides loading/error states
}
```

### Database Explorer

The `DatabaseDemo` component provides an interactive way to explore the database:

- View all tables in the database
- Inspect table schemas
- Execute custom SQL queries
- View query results in a table format

## API Reference

### DatabaseService Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `initialize()` | Initialize the database connection | None | `Promise<void>` |
| `query(sql, params)` | Execute a custom SQL query | `sql: string, params: (string\|number)[]` | `Promise<Record<string, unknown>[]>` |
| `getTableNames()` | Get all table names | None | `Promise<string[]>` |
| `getTableSchema(tableName)` | Get schema for a specific table | `tableName: string` | `Promise<TableInfo[]>` |
| `getAllUsers()` | Get all users | None | `Promise<User[]>` |
| `getUserById(id)` | Get user by ID | `id: number` | `Promise<User \| null>` |
| `searchUsers(searchTerm)` | Search users by name or email | `searchTerm: string` | `Promise<User[]>` |
| `getUsersWithPagination(limit, offset)` | Get paginated users | `limit: number, offset: number` | `Promise<User[]>` |
| `getTotalUsersCount()` | Get total number of users | None | `Promise<number>` |
| `close()` | Close the database connection | None | `void` |

### useDatabase Hook

The hook provides the following state and methods:

#### State
- `isInitialized: boolean` - Whether the database has been initialized
- `isLoading: boolean` - Whether a database operation is in progress
- `error: string \| null` - Any error that occurred
- `users: User[]` - Current list of users
- `totalUsers: number` - Total number of users in the database

#### Methods
- `getAllUsers()` - Load all users
- `getUserById(id)` - Get a specific user
- `searchUsers(searchTerm)` - Search users
- `getUsersWithPagination(limit, offset)` - Get paginated users
- `getTotalUsersCount()` - Get total user count

## Data Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  address: string;
}

interface TableInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
}
```

## Performance Considerations

1. **Database Size**: sql.js loads the entire database into memory, so keep the database file reasonably small (< 50MB for good performance)

2. **Initialization**: The database file is downloaded on first access, which may take a moment for larger files

3. **Memory Usage**: The entire database is kept in memory, so monitor memory usage with large datasets

4. **Query Performance**: Complex queries may be slower than server-side databases, but simple queries are very fast

## Browser Compatibility

sql.js works in all modern browsers that support:
- WebAssembly
- TypedArrays
- Fetch API

## Security Notes

- The database file is publicly accessible in the `public/` folder
- All database operations happen client-side
- No sensitive data should be stored in the database file
- Consider encrypting the database file if needed

## Troubleshooting

### Common Issues

1. **Database not loading**: Ensure the database file is in the `public/` folder
2. **CORS errors**: The database file must be served from the same domain
3. **Memory errors**: Large databases may cause memory issues
4. **Type errors**: Ensure you're using the correct TypeScript types

### Debug Tips

- Use the `DatabaseDemo` component to test queries
- Check browser console for detailed error messages
- Verify database file integrity
- Test with smaller database files first

## Example Usage in Components

```typescript
import { useDatabase } from '../hooks/useDatabase';

function UserList() {
  const { users, isLoading, error, searchUsers } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    searchUsers(term);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users..."
      />
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

This setup provides a powerful way to work with SQLite databases directly in the browser, enabling offline-capable applications and reducing server dependencies. 