import reporter from 'cucumber-html-reporter'

const options = {
  theme: 'bootstrap',
  jsonFile: './cucumber.json',
  output: '.test_output/cucumber.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}

reporter.generate(options)