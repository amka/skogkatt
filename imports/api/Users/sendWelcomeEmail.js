import { Meteor } from 'meteor/meteor';
import sendEmail from '../../modules/server/sendEmail';
import getOAuthProfile from '../../modules/getOauthProfile';

export default (options, user) => {
  const OAuthProfile = getOAuthProfile(options, user);

  const applicationName = Meteor.settings.public.appTitle;
  const helloEmail = Meteor.settings.private.email.hello;
  const firstName = OAuthProfile ? OAuthProfile.name.first : options.profile.name.first;
  const emailAddress = OAuthProfile ? OAuthProfile.email : options.email;

  return sendEmail({
    to: emailAddress,
    from: `${applicationName} <${helloEmail}>`,
    subject: `[${applicationName}] Welcome, ${firstName}!`,
    template: 'welcome',
    templateVars: {
      applicationName,
      firstName,
      welcomeUrl: Meteor.absoluteUrl('documents'), // e.g., returns http://localhost:3000/documents
    },
  })
    .catch((error) => {
      throw new Meteor.Error('500', `${error}`);
    });
};
