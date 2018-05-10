import reporterHtml from 'cucumber-html-reporter'

const options = {
  theme: 'bootstrap',
  jsonFile: '.test_output/cucumber.json',
  output: '.test_output/cucumber/index.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}
reporterHtml.generate(options)