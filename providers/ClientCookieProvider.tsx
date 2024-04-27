import React from "react";
import { CookiesProvider } from "next-client-cookies/server";
const ClientCookieProvider = ({ children }: { children: React.ReactNode }) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default ClientCookieProvider;
