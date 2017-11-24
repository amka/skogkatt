import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import getPrivateFile from '../../../modules/server/getPrivateFile';
import templateToHTML from '../../../modules/server/handlebarsEmailToHtml';
import templateToText from '../../../modules/server/handlebarsEmailToText';

const name = Meteor.settings.public.appTitle
const email = `<${Meteor.settings.private.email.hello}>`;
const from = `${name} ${email}`;
const { emailTemplates } = Accounts;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.verifyEmail = {
    subject () {
        return `[${name}] Verify Your Email Address`;
    },
    html (user, url) {
        return templateToHTML(getPrivateFile('email-templates/verify-email.html'), {
            applicationName: name,
            firstName: user.profile.name.first,
            verifyUrl: url.replace('#/', ''),
        });
    },
    text (user, url) {
        const urlWithoutHash = url.replace('#/', '');
        if (Meteor.isDevelopment) console.info(`Verify Email Link: ${urlWithoutHash}`); // eslint-disable-line
        return templateToText(getPrivateFile('email-templates/verify-email.txt'), {
            applicationName: name,
            firstName: user.profile.name.first,
            verifyUrl: urlWithoutHash,
        });
    },
};

emailTemplates.resetPassword = {
    subject () {
        return `[${name}] Reset Your Password`;
    },
    html (user, url) {
        return templateToHTML(getPrivateFile('email-templates/reset-password.html'), {
            firstName: user.profile.name.first,
            applicationName: name,
            emailAddress: user.emails[0].address,
            resetUrl: url.replace('#/', ''),
        });
    },
    text (user, url) {
        const urlWithoutHash = url.replace('#/', '');
        if (Meteor.isDevelopment) console.info(`Reset Password Link: ${urlWithoutHash}`); // eslint-disable-line
        return templateToText(getPrivateFile('email-templates/reset-password.txt'), {
            firstName: user.profile.name.first,
            applicationName: name,
            emailAddress: user.emails[0].address,
            resetUrl: urlWithoutHash,
        });
    },
};
