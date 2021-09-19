let db
const request = indexedDB.open('budget', 1)

//in the event of database version changes
request.onupgradeneeded = (e) => {
  const db = e.target.result
  db.createObjectStore('pending', { autoIncrement: true })
}
