import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUsers, deleteUser as deleteUserRequest, updateUser } from "../services/api";
import useDebounce from "./useDebounce";

const PAGE_SIZE = 8;

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newThisWeek: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 350);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers({
        search: debouncedSearch,
        status,
        sort,
        page,
        limit: PAGE_SIZE,
      });
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, sort, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 whenever a filter/search/sort changes.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, sort]);

  const removeUser = async (id) => {
    try {
      const data = await deleteUserRequest(id);
      toast.success(data.message || "User deleted successfully.");
      // Re-fetch so stats/pagination stay accurate rather than just
      // filtering client-side.
      fetchUsers();
      return true;
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      return false;
    }
  };

  const toggleStatus = async (user) => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    try {
      await updateUser(user._id, { ...user, status: nextStatus });
      toast.success(`${user.name} marked as ${nextStatus}.`);
      fetchUsers();
      return true;
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      return false;
    }
  };

  return {
    users,
    stats,
    loading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    removeUser,
    toggleStatus,
    refetch: fetchUsers,
  };
}
