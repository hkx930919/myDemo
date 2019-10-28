let db;
function add() {
  const transaction = db.transaction(['person'], 'readwrite')
    .objectStore('person').add({
      id: 1, name: '张三', age: 24, email: 'zhangsan@example.com',
    });
  transaction.onsuccess = (e) => {
    console.log('添加成功');
    console.log(e);
  };
  transaction.onerror = (e) => {
    console.log('添加失败');
    console.log(e);
  };
}

const request = window.indexedDB.open('test');

request.onsuccess = (e) => {
  console.log('--连接成功');
  db = e.target.result;
};
request.onerror = (e) => {
  console.log('--连接失败');
  db = e.target.result;
};
request.onupgradeneeded = (e) => {
  console.log('onupgradeneeded --新建数据库');
  db = e.target.result;
  let objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  } else {
    objectStore = db.transaction(['test'], 'readwrite');
  }
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
  add();
};
