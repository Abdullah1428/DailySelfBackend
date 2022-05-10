const { app } = require('./app.js');

// selecting port
const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server running in on port ${PORT}`));
