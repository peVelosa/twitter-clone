import { getServerSession } from "next-auth";

import { authOptions } from "../libs/auth";

const useServerSession = () => {
  const session = getServerSession(authOptions);
  return session;
};

export default useServerSession;
