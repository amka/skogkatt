import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import getPrivateFile from '../../../modules/server/getPrivateFile'
import parseMarkdown from '../../../modules/parseMarkdown'

Meteor.methods({
  'utility.getPage': function utilityGetPage(fileName) {
    check(fileName, String);
    return parseMarkdown(getPrivateFile(`pages/${fileName}.md`));
  },
});
