import app from './server'

const port = process.env.PORT || process.env.NODE_PORT || 80

app.listen(port, () => console.log(`Listening in port ${port}`))