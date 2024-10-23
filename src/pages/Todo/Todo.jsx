import { useState, useEffect, useRef } from "react";
import { fetchTodos } from "../../data/todos";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./Todo.css";

const initItems = 10;
const onlyWaiting = false;

function Todo() {
  //todoRaw
  const [todosRaw, setTodosRaw] = useState([]);

  //todo
  const [todos, setTodos] = useState([]);

  //filter
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //display
  const [numPage, setNumPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newIdRef = useRef();
  const newTitleRef = useRef();

  useEffect(() => {
    console.log(`onlyWaiting:${onlyWaiting}`);
  }, [onlyWaiting]);

  //load
  useEffect(() => {
    setTodosRaw(fetchTodos());
    setCurPage(1);
  }, []);

  //useEffect filter
  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting, itemsPerPage]);

  useEffect(() => {
    console.log(`itemsPerPage:${itemsPerPage}`);
    setNumPage(Math.ceil(todosRaw.length / itemsPerPage));
  }, [itemsPerPage, todosRaw]);

  useEffect(() => {
    setCurPage(1);
  }, [numPage]);

  useEffect(() => {
    console.log(`curPage:${curPage}`);
  }, [curPage]);

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }

  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) =>todo.id === id)
    todoSelected.completed = true;
    setTodos([...todosRaw]);
  }

  function addClick(id, title) {
    const newItem = {
      id, 
      title, 
      completed:false, 
      userId:1
    }

    setTodosRaw([...todosRaw, newItem]);
  }

  return (
    <div className="todo-container">
      {/* ---modal--- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg">&nbsp;Add new todo</span>{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID :</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disabled
                value={
                  Number(
                    todosRaw.reduce(
                      (prev, todo) => (todo.id > prev ? todo.id : prev),
                      0
                    )
                  ) + 1
                }
                ref={newIdRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title :</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp; Cancel</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim()
              if(title === ""){
                alert("Title cannot be empty")
                newTitleRef.current.value = ""
                newTitleRef.current.focus()
              }else{addClick(id, title);
                handleClose();}
            }}
          >
            <span className="bi bi-plus-lg">&nbsp; Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ---modal--- */}

      {/* filter */}
      <div className="todo-filter-container">
        <div className="form-check form-switch" valign="middle">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onClick={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked " valign="middle">
            Show only &nbsp;
            <button className="btn btn-warning" valign="middle">
              waiting&nbsp;
              <span className="bi bi-clock"></span>
            </button>
          </label>
        </div>

        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
        >
          <option value={5} selected>
            5 items per page
          </option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table  */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th style={{width:"10%" }} valign="middle">ID</th>
            <th valign="middle">Title</th>
            <th style={{ textAlign: "right" }} valign="middle">
              Completed &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                  document
                    .getElementById("exampleModal")
                    .setAttribute("ariaHidden", "true");
                }}
              >
                <span className="bi bi-plus"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itemsPerPage;
              const max = curPage * itemsPerPage - 1;
              return index >= min && index <= max;
            })
            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <span className="btn btn-secondary" valign="middle">{todo.id}</span>
                  </td>
                  <td style={{ textAlign: "left" }} valign="middle">{todo.title} </td>
                  <td style={{ textAlign: "right" }} valign="middle">
                    {todo.completed ? (
                      <span className="badge bg-success">
                        Done &nbsp;
                        <span className="bi bi-check"></span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          waitingClick(todo.id);
                        }}
                      >
                        Waiting &nbsp;
                        <span className="bi bi-clock"></span>
                      </button>
                    )}&nbsp;

                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash-fill"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* page control */}
      <div className="todo-page-control-container">
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage === 1}
        >
          First
        </button>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage === 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {" "}
          {curPage}&nbsp; /&nbsp; {numPage}
        </span>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => curPage < numPage && setCurPage(curPage + 1)}
          disabled={curPage === numPage}
        >
          Next
        </button>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => {
            setCurPage(numPage);
          }}
          disabled={curPage === numPage}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
