import { getServerSession } from "next-auth";

import { authOptions } from "../libs/auth";

const useServerSession = async () => {
  return await getServerSession(authOptions);
};

export default useServerSession;
