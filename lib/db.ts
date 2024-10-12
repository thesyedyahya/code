// This is a mock database implementation
// In a real application, you would use an actual database connection

interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'teacher';
}

let users: User[] = [];

const db = {
  query: async (text: string, params: any[]): Promise<{ rows: any[] }> => {
    // Mock implementation of database queries
    if (text.startsWith('SELECT')) {
      return { rows: users.filter(u => u.email === params[0]) };
    } else if (text.startsWith('INSERT')) {
      const newUser: User = {
        id: users.length + 1,
        name: params[0],
        email: params[1],
        password_hash: params[2],
        role: params[3],
      };
      users.push(newUser);
      return { rows: [newUser] };
    }
    return { rows: [] };
  },
};

export default db;