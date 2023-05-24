// cucumber.js
let common = [
    '__tests__/features/*.feature',                // Specify our feature files
    '--require-module ts-node/register',    // Load TypeScript module
    '--require __tests__/features/steps/**/*.ts',   // Load step definitions
    '--format progress-bar',
    '--publish-quiet'
].join(' ')

module.exports = {
    default: common
}