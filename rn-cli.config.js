/* eslint-disable */
/*
 * This is a workaround to use react-native-vector-icons on React-Native 0.52+
 * it'll need to be removed when the following issue is resolved:
 * https://github.com/facebook/react-native/pull/17672
 * Info about it on react-native-vector-icons repo:
 * https://github.com/oblador/react-native-vector-icons/issues/626#issuecomment-362386341
 */

const blacklist = require('metro/src/blacklist')
module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
}
