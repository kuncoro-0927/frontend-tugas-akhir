import React from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import ModalCreateUser from "../../../components/Admin/Modal/Users/CreateUser";
import ModalUpdateUser from "../../../components/Admin/Modal/Users/UpdateUser";
import DetailUsers from "../../../components/Admin/Modal/Users/DetailUser";
import ModalDeleteUsers from "../../../components/Admin/Modal/Users/DeleteUser";

import useDataUsers from "./hooks/useDataUsers";
import useUserModals from "./hooks/useUserModals";

import SearchInput from "./components/SearchInput";
import RoleTabs from "./components/RoleTabs";
import UsersTable from "./components/UsersTable";

const DataUsers = () => {
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    fetchUsers,
  } = useDataUsers();

  const {
    selectedUserId,
    createModal,
    updateModal,
    deleteModal,
    drawerOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenDrawer,
    handleCloseDrawer,
  } = useUserModals();

  return (
    <>
      <DetailUsers
        open={drawerOpen}
        onClose={handleCloseDrawer}
        userId={selectedUserId}
      />
      <ModalCreateUser
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={fetchUsers}
      />
      <ModalUpdateUser
        open={updateModal}
        handleClose={handleCloseUpdateModal}
        onUpdate={fetchUsers}
        userId={selectedUserId}
      />
      <ModalDeleteUsers
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        userId={selectedUserId}
        onUpdate={fetchUsers}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        <div className="flex items-center justify-between">
          <h1>Data Pengguna</h1>
          <div className="flex items-center gap-5">
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
            >
              <LuUserRoundPlus className="text-lg" />
              Tambah
            </button>
          </div>
        </div>

        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-semibold text-sm">Tabel Data Pengguna</p>
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="px-0">
            <RoleTabs activeTab={activeTab} onChange={setActiveTab} />
            <UsersTable
              users={filteredUsers}
              onEdit={handleOpenUpdateModal}
              onDetail={handleOpenDrawer}
              onDelete={handleOpenDeleteModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataUsers;
