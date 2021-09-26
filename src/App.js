import React, {useState, useEffect } from "react";

// モックサーバーとの通信のため
import axios from "axios";

// ローカルに準備したモックサーバーのURL
const todoDataUrl = "http://localhost:3100/todos";

function App() {
  // todoListは現在のTODOの状態
  // setTodoListは現在のtodoListの状態を更新するための関数
  // todoListの初期値に空の配列をセット
  const [todoList, setTodoList] = useState([]);

  // useEffect()を利用することでコンポーネントのマウント後に処理を実行
  // async.await で非同期処理
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(todoDataUrl);

      setTodoList(response.data);
    };
    fetchData();
  }, []);


  console.log("TODOリスト", todoList);

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  console.log("未完了TODOリスト:", inCompletedList);

  const completedList = todoList.filter((todo) => {
    return todo.done;
  })

  console.log("完了TODOリスト:", completedList);

  return (
    <>
      <h1>TODO進捗管理</h1>

      <textarea/>

      <button>+ TODOを追加</button>

      <h2>未完了TODOリスト</h2>
      <ul>
        {inCompletedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}

            <button>
              ({todo.done ? "完了" : "未完了"})
            </button>

            <button>削除</button>
          </li>
        ))}
      </ul>

      <h2>完了TODOリスト</h2>

      <ul>

        {completedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}

            <button>
              ({todo.done ? "完了" : "未完了"})
            </button>

            <button>削除</button>
          </li>

        ))}
      </ul>
    </>
  )
}

export default App;
