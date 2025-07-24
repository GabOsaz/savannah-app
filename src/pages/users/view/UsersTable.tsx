import Loader from "../../../components/Loader";
import type { User } from "../controller/usersCompLogic";

const UsersTable = ({
  isLoading,
  users,
  searchTerm,
  handleRowClick,
}: {
  isLoading: boolean;
  users: User[];
  searchTerm: string;
  handleRowClick: (id: string) => void;
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <Th>Full Name</Th>
              <Th>Email Address</Th>
              <Th>Address</Th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <Loader message="Loading users..." />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {searchTerm
                    ? "No users found matching your search."
                    : "No users found."}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-250"
                  onClick={() => handleRowClick(user.id)}
                >
                  <Td className="font-medium">{user.name}</Td>
                  <Td className="font-normal lowercase">{user.email}</Td>
                  <Td className="max-w-[392px] font-normal">
                    <div className="truncate" title={user.address}>
                      {user.address}
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

const Th = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
};

const Td = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${className}`}
    >
      {children}
    </td>
  );
};
