const reporterHtml = require('cucumber-html-reporter')
const junit = require('cucumber-junit')
const fs = require('fs')

const options = {
  theme: 'bootstrap',
  jsonFile: '.test_output/cucumber.json',
  output: '.test_output/cucumber/index.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}

fs.readFile('cucumber.json', 'utf8', (err, data) => {
  if (err) throw err
  const json = data.substring(0, data.indexOf('----'))
  fs.writeFile('.test_output/cucumber.json', json, err => {
    if (err) throw err
    reporterHtml.generate(options)
    fs.writeFile('.test_output/cucumber/cucumber.xml', junit(json), err => {
      if (err) throw err
    })
  })
})