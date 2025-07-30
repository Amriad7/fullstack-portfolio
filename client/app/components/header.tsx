import Logo from "./logo";
import NavMenu from "./nav-menu";
import SideMenu from "./side-menu";
import ThemeToggler from "./theme-toggler";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <header className="z-50 fixed top-0 right-0 flex items-center justify-between w-full py-3 px-8">
      <Logo />
      <NavMenu className="hidden lg:inline-block" />
      <div className="flex items-center gap-2">
        <ThemeToggler />
        <UserMenu />
        <SideMenu />
      </div>
    </header>
  );
};
export default Header;
