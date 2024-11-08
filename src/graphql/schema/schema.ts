import { builder } from './builder';

// Simple imports ensure builder code runs
// Ex: User/index imports User/types, which runs builder code
// to create the user object
import '../resolvers/user/index';
import '../resolvers/brand/index';
import '../resolvers/campaign/index';
import '../resolvers/claim/index';
import '../resolvers/financial_transaction/index';
import '../resolvers/payout/index';

export const schema = builder.toSchema({});
export default { schema };
