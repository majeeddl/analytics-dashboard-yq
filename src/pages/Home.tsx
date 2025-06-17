import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";

import Header from "@/components/layout/header/header";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
  useEffect(() => {
    const toastTypes = [
      {
        type: "success",
        fn: toast.success,
        messages: [
          "Operation successful!",
          "All done!",
          "Success!",
          "Everything went smoothly.",
        ],
      },
      {
        type: "warning",
        fn: toast.warning,
        messages: [
          "Be careful!",
          "This is a warning.",
          "Check your input.",
          "Warning: Something might be wrong.",
        ],
      },
      {
        type: "info",
        fn: toast.info,
        messages: [
          "FYI: Info message.",
          "Here is some information.",
          "Just so you know.",
          "Heads up!",
        ],
      },
      {
        type: "error",
        fn: toast.error,
        messages: [
          "An error occurred!",
          "Oops, something went wrong.",
          "Error: Please try again.",
          "Failed to complete action.",
        ],
      },
    ];

    let timer: ReturnType<typeof setTimeout>;
    function showRandomToast() {
      const randomType =
        toastTypes[Math.floor(Math.random() * toastTypes.length)];
      const randomMessage =
        randomType.messages[
          Math.floor(Math.random() * randomType.messages.length)
        ];
      randomType.fn(randomMessage);
      const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // 2000ms to 5000ms
      timer = setTimeout(showRandomToast, randomDelay);
    }
    showRandomToast();
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Toaster />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Home;
