import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDebounce } from "../../../hooks/useDebounce";
import { useGetUsers, useGetTotalUsersCount } from "../model/queries";

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
}

export const useUsersCompLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial page from the URL (e.g. /?page=2)
  const getPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page") || "1", 10);
    return isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  };

  const [currentPage, setCurrentPage] = useState<number>(() => getPageFromURL());
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const itemsPerPage = 4;

  // TanStack Query hooks - these will run automatically when dependencies change
  const usersQuery = useGetUsers(
    currentPage,
    debouncedSearchTerm,
    itemsPerPage
  );

  // Restore focus to the input once a fetch completes (avoids blur)
  useEffect(() => {
    if (!usersQuery.isFetching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [usersQuery.isFetching]);

  const totalUsersQuery = useGetTotalUsersCount(debouncedSearchTerm);

  const handleRowClick = (userId: string) => {
    navigate({ pathname: `/users/${userId}`, search: location.search });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());

    navigate({ pathname: "/", search: params.toString() });
  };

  // Sync state with URL if the user manually updates the query string or navigates
  useEffect(() => {
    const pageFromURL = getPageFromURL();
    if (pageFromURL !== currentPage) {
      setCurrentPage(pageFromURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const users = (usersQuery.data || []) as User[];
  const totalUsers = (totalUsersQuery.data || 0) as number;
  const isLoading = usersQuery.isLoading || totalUsersQuery.isLoading;
  const error = usersQuery.error || totalUsersQuery.error;
  // Determine if this is the very first load (no data yet)
  const isInitialLoading = usersQuery.isLoading && users.length === 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  return {
    users,
    totalUsers,
    isLoading,
    error,
    isInitialLoading,
    totalPages,
    handleRowClick,
    handlePageChange,
    setSearchTerm,
    inputRef,
    currentPage,
    searchTerm,
    debouncedSearchTerm,
  };
};
