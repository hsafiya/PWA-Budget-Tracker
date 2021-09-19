let db
const request = indexedDB.open('budget', 1)

//in the event of database version changes
request.onupgradeneeded = (e) => {
  const db = e.target.result
  db.createObjectStore('pending', { autoIncrement: true })
}
//after a successful creation
request.onsuccess = (e) => {
    db = e.target.result
    //   check if online, and if true, update database
    if (navigator.onLine) {
      offlineData()
    }
  }
  // error handling
request.onerror = (e) => console.log(e.target.errorCode)
// function to store data when offline
const saveRecord = (record) => {
    const transaction = db.transaction(['pending'], 'readwrite')
    const store = transaction.objectStore('pending')
    store.add(record)
  }
  
  const offlineData = () => {
    const transaction = db.transaction(['pending'], 'readwrite')
    const store = transaction.objectStore('pending')
    const allRecords = store.getAll()
  
    allRecords.onsuccess = () => {