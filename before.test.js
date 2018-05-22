const rimraf = require('rimraf')
rimraf('quiz-room.db', err => { if (err) throw err })
rimraf('cucumber.json', err => { if (err) throw err })
