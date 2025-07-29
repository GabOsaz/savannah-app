import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { useUsersCompLogic } from "./controller/usersCompLogic";
import SearchBar from "./view/SearchBar";
import UsersTable from "./view/UsersTable";

function Users() {
  const componentLogic = useUsersCompLogic();

  if (componentLogic.isInitialLoading) {
    return <Loader message="Loading users..." />;
  }

  if (componentLogic.error) {
    return <Error message={`Error: ${componentLogic.error.message}`} />;
  }

  return (
    <div className="max-w-[80%] lg:min-w-[856px] mx-auto space-y-6">
      <h1 className="text-6xl font-medium text-[#181D27]">Users</h1>

      {/* Search Bar */}
      <div className="">
        <SearchBar
          inputRef={componentLogic.inputRef}
          searchTerm={componentLogic.searchTerm}
          setSearchTerm={componentLogic.setSearchTerm}
          handlePageChange={componentLogic.handlePageChange}
        />
      </div>

      <UsersTable
        isLoading={componentLogic.isLoading}
        users={componentLogic.users}
        searchTerm={componentLogic.searchTerm}
        handleRowClick={componentLogic.handleRowClick}
      />

      {/* Pagination */}
      {componentLogic.totalPages > 1 && (
        <div className="">
          <Pagination
            currentPage={componentLogic.currentPage}
            totalPages={componentLogic.totalPages}
            onPageChange={componentLogic.handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Users;
