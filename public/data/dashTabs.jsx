import { IconBellRinging, IconCreditCard, IconCreditCardOff, IconHistory, IconLogout, IconSettings, IconUser, IconWallet } from "@tabler/icons-react";
import React from "react";

export const dashboardTabs = [

  {
    id: 1,
    tabname: "Dashboard",
    icon: <IconUser className="ti ti-user fs-five n5-color" />,
  },
  
  {
    id: 2,
    tabname: "Deposit",
    icon: <IconCreditCard className="ti ti-credit-card fs-five n5-color" />,
  },

  {
    id: 3,
    tabname: "Withdraw",
    icon: <IconCreditCard className="ti ti-credit-card fs-five n5-color" />,
  },
  
  {
    id: 4,
    tabname: "Withdraw History",
    icon: <IconCreditCardOff className="ti ti-credit-card-off fs-five n5-color" />,
  },
  {
    id: 5,
    tabname: "Deposit History",
    icon: <IconHistory className="ti ti-history fs-five n5-color" />,
  },
  {
    id: 6,
    tabname: "Bet History",
    icon: <IconHistory className="ti ti-history fs-five n5-color" />,
  },
  {
    id: 7,
    tabname: "Profile",
    icon: <IconUser
      className="ti ti-user fs-five n5-color" />,
  },
  {
    id: 8,
    tabname: "Password Update",
    icon: <IconSettings
      className="ti ti-settings fs-five n5-color" />,
  },
  // {
  //   id: 8,
  //   tabname: "Notifications",
  //   icon: <IconBellRinging
  //     className="ti ti-bell-ringing fs-five n5-color" />,
  // },

  // {
  //   id: 8,
  //   tabname: "Log out",
  //   icon: <IconLogout
  //     className="ti ti-logout fs-five n5-color" />,
  // },
  
];