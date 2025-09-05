import { home_path } from "./api_path";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  session: {
    // Set the session max age to 1 minute (in seconds)
    maxAge: 7200, // 1 minute
    // Optionally, specify the session update interval
    updateAge: 7200, // Re-validate the session every 1 minute
  },
  jwt: {
    // Token expiration time, 60 seconds (1 minute)
    maxAge: 7200,
  },
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.currency = user.currency;
        token.user_id = user.user_id;
        token.email = user.email;
        token.mobile = user.mobile;
        token.role_as = user.role_as;
        token.curr_sign = user.curr_sign;
        token.country_currency = user.country_currency;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.agent_id = user.agent_id;
        token.refferer = user.refferer;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.currency = token.currency;
        session.user.user_id = token.user_id;
        session.user.email = token.email;
        session.user.mobile = token.mobile;
        session.user.role_as = token.role_as;
        session.user.curr_sign = token.curr_sign;
        session.user.country_currency = token.country_currency;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.isAdmin = token.isAdmin;
        session.user.agent_id = token.agent_id;
        session.user.refferer = token.refferer;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        // Handle base URL (likely "/")
        return "/";
      }

      return home_path;
    },
    async logout({ url, baseUrl }) {
      return new URL(baseUrl, "/login");
    },
    flavored: true,
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      //const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnDashboardPage =
        request.nextUrl?.pathname.startsWith("/dashboard");
      const isOnSportsbookPage =
        request.nextUrl?.pathname.startsWith("/sportsbook");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      if (isOnDashboardPage && !user) {
        return false;
      }

      if (isOnSportsbookPage && !user) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
