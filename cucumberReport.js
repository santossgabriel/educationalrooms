import reporterHtml from 'cucumber-html-reporter'
import junit from 'cucumber-junit'
import fs from 'fs'

const options = {
  theme: 'bootstrap',
  jsonFile: '.test_output/cucumber.json',
  output: '.test_output/cucumber/index.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}

reporterHtml.generate(options)

fs.readFile('.test_output/cucumber.json', 'utf8', (err, data) => {
  if (err) throw err
  fs.writeFile('.test_output/cucumber/cucumber.xml', junit(data), err => {
    if (err) throw err
  })
})