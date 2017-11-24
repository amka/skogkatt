import { Accounts } from 'meteor/accounts-base'
import sendWelcomeEmail from '../../../api/Users/sendWelcomeEmail';

Accounts.onCreateUser((options, user) => {
    const userToCreate = user;

    // Add empty default fields to new user profile
    let profile = {
        name: {
            first: '',
            last: ''
        }
    }
    if (options.profile) {
        Object.assign(profile, options.profile)
    }
    userToCreate.profile = profile;

    sendWelcomeEmail({profile}, user);
    return userToCreate;
});