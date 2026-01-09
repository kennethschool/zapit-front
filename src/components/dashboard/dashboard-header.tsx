"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MailOpen, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { BorderBeam } from "../magicUI/borderBeams";
import { useTheme } from "../theme/ThemeProvider";
import { Drawer } from "vaul";

export function DashboardHeader() {
  const [notifications, setNotifications] = useState(3);
  const { theme } = useTheme();
  const [dOpen, setDOpen] = useState(false);

  return (
    <Card
      className={`mb-4 hidden p-4 bg-gradient-to-r ${theme !== "dark" ? "from-yellow-50 to-yellow-100" : "from-yellow-950/30 to-yellow-900/20"} border-none relative`}
    >
      <BorderBeam
        duration={6}
        delay={3}
        initialOffset={20}
        size={100}
        className="from-transparent via-yellow-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={1}
        size={100}
        className="from-transparent via-yellow-300 to-transparent"
      />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Junebug!</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your quizzes today.
          </p>
        </div>

        <div id="notifications" className="absolute">
          <Drawer.Root
            open={dOpen}
            direction="right"
            onClose={() => setDOpen(false)} // will fire on outside click
          >
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 z-80" />
              <Drawer.Content
                className="right-2 top-2 bottom-2 fixed z-80 outline-none w-[410px] flex"
                // The gap between the edge of the screen and the drawer is 8px in this case.
                style={
                  {
                    "--initial-transform": "calc(100% + 8px)",
                  } as React.CSSProperties
                }
              >
                <div className="bg-background border m gap-4 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                  <div className="max-w-md mx-auto text-center">
                    <Drawer.Title className="font-medium mb-2 text-foreground">
                      Notifications
                    </Drawer.Title>
                    <Drawer.Description className="text-foreground/75 mb-2">
                      Zapit Alpha Notifications
                    </Drawer.Description>
                  </div>
                  <div className="flex justify-between">
                    <Button variant={"ghost"} className="hover:bg-accent gap-2">
                      <MailOpen className="h-4 w-4" /> Mark all as read
                    </Button>
                    <Button className="gap-1" variant={"ghost"}>
                      Clear all
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="overflow-y-auto space-y-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          You have been banned from Zapit
                        </CardTitle>
                        <X className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Reason for this choice: Misuse of AI services
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Moderator Note: Just dont...
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          You have been banned from Zapit
                        </CardTitle>
                        <X className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Reason for this choice: Misuse of AI services
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Moderator Note: Just dont...
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => [setNotifications(0), setDOpen(true)]}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-xs w-5 h-5 rounded-full flex items-center justify-center text-primary-foreground">
                {notifications}
              </span>
            )}
          </Button>

          <Button variant="outline" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
