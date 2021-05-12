import { AuthMethods } from '../../models/auth-methods.model';
import { UserMetadata } from '../../models/user-metadata.model';

export interface UserState {
  userMetadata: UserMetadata | null;
  authMethod: AuthMethods | null;
  accessToken: string | null;
}
