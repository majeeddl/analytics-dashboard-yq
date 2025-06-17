import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserProfile from "./user-profile";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <UserProfile />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
