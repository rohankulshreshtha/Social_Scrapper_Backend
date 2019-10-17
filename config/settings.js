module.exports = {
  is_production : process.env.NODE_ENV === 'production' ? 1 : -1,
  port : process.env.NODE_ENV === 'production' ? 5000 : 3000
}
