module.exports = {
  getIndexInfo: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Index Service Info")
      }, 200)
    })
  },
}