const Royale = require('../Client');
const client = new Royale('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMwLCJpZGVuIjoiMjc5NTUwNzkyNzc0NTgyMjcyIiwibWQiOnt9LCJ0cyI6MTUyNzcyMzUwMjA2M30.sbaclXFdaXY-fZLYlVD1fJAI0GEKthY6ByVWdXlQ6JI')

client.Api._get('version').then(console.log)
