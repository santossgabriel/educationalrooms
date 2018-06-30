import app from './server'

const port = process.env.PORT || 80

app.listen(port, () => console.log(`Listening in port ${port}`))