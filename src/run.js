import app from './server'

const port = process.env.PORT || process.env.NODE_PORT || 80

console.log(`Environment: ${process.env.NODE_ENV}`)

app.listen(port, () => console.log(`Listening in port ${port}`))