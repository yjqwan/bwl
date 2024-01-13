// 从本地存储中获取备忘录数据
function getMemoData() {
  var memoData = localStorage.getItem('memoData');
  return memoData ? JSON.parse(memoData) : [];
}
// 将备忘录数据保存到本地存储中
function saveMemoData(data) {
  localStorage.setItem('memoData', JSON.stringify(data));
}
// 渲染备忘录列表
function renderMemoList() {
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  var memoData = getMemoData();
  memoData.forEach(function (memo) {
    var listItem = document.createElement('li');
    listItem.textContent = memo;
    // 添加删除按钮
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.style.backgroundColor = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = '#007bff';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.addEventListener('click', function () {
      if (confirm('😢你真的忍心抛弃我吗？😢')) {
        var index = memoData.indexOf(memo);
        memoData.splice(index, 1);
        saveMemoData(memoData);
        renderMemoList();
      }
    });
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
}
// 添加任务到备忘录列表
function addTask() {
  var input = document.getElementById('taskInput');
  var task = input.value.trim();
  if (task !== '') {
    var memoData = getMemoData();
    memoData.push(task);
    saveMemoData(memoData);
    input.value = '';
    renderMemoList();
  }
}
// 监听添加按钮的点击事件
var addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.addEventListener('click', addTask);
// 初始化备忘录列表
renderMemoList();
