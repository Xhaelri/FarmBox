
// ./types/Session.ts (Example Adjustment)
interface User {
  id?: string; // Maybe an ID is present
  name?: string | null; // Be explicit about null possibility
  email?: string | null;
  image?: string | null;
}

interface SessionType {
  user?: User;
  // expires?: string; // Maybe expires isn't directly on the session object
  // Maybe other fields exist?
  espires?: string; // Expiration time of the session
  accessToken?: string;
}

export default SessionType;