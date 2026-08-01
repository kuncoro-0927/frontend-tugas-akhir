import { useEffect, useState } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";

const useDataUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("user");

  const fetchUsers = async () => {
    try {
      const response = await instanceAdmin.get("/all/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter((user) => user.role_name === activeTab);

    if (searchQuery !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((user) => {
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role_name.toLowerCase().includes(query) ||
          (user.city && user.city.toLowerCase().includes(query)) ||
          (user.province && user.province.toLowerCase().includes(query)) ||
          (user.phone && user.phone.toLowerCase().includes(query))
        );
      });
    }

    setFilteredUsers(filtered);
  }, [searchQuery, users, activeTab]);

  return {
    users,
    filteredUsers,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    fetchUsers,
  };
};

export default useDataUsers;
