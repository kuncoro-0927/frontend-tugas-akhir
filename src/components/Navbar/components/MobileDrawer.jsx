import React from "react";
import Drawer from "@mui/material/Drawer";
import { CiUser, CiShoppingTag } from "react-icons/ci";
import MobileAccountMenu from "./MobileAccountMenu";
import MobileGuestPrompt from "./MobileGuestPrompt";
import MobileMenuSection from "./MobileMenuSection";

const MENU_ITEMS = [{ to: "/products/list", label: "Produk", icon: CiUser }];

const HELP_ITEMS = [
  { to: "/contact", label: "Kontak", icon: CiUser },
  { to: "/help/center", label: "Help Center", icon: CiShoppingTag },
];

const MobileDrawer = ({
  open,
  onClose,
  isLoggedIn,
  user,
  onNavigate,
  onLogout,
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div className="lg:hidden">
      <Drawer
        anchor="top"
        open={open}
        onClose={onClose}
        hideBackdrop
        ModalProps={{
          style: {
            zIndex: 40,
            top: "56px",
            height: "calc(100% - 56px)",
            overflow: "hidden",
            position: "fixed",
            width: "100%",
          },
        }}
        PaperProps={{
          style: {
            height: "100%",
            boxSizing: "border-box",
            backgroundColor: "#fff",
          },
        }}
      >
        <div className="p-4 pt-20 flex flex-col h-full">
          <div className="mt-4 mb-6">
            {isLoggedIn ? (
              <MobileAccountMenu
                user={user}
                onNavigate={onNavigate}
                onLogout={onLogout}
              />
            ) : (
              <MobileGuestPrompt
                onRegisterClick={onRegisterClick}
                onLoginClick={onLoginClick}
              />
            )}
          </div>

          <MobileMenuSection title="Menu" items={MENU_ITEMS} onNavigate={onNavigate} />
          <MobileMenuSection title="Bantuan" items={HELP_ITEMS} onNavigate={onNavigate} />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
