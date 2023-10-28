import { getServerSession } from "next-auth";

import { authOptions } from "../libs/auth";

const useServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default useServerSession;
