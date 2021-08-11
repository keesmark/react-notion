import styles from '../styles/Home.module.css'
import {useState} from "react";
// import Todo from '../components/todo'
import {DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {v4 as uuid} from "uuid"


export default function Home() {
    const [todos, setTodos] = useState([]);
    const [body, setBody] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const id = uuid();
        const todo = {
            id: id,
            body: body
        }
        setTodos([...todos, todo]);
        setBody("")
    }

    const handleOnDragEnd = (end) => {
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(end.source.index, 1);
        items.splice(end.destination.index, 0, reorderedItem);

        setTodos(items);
    }

    const onChangeTodo = (todo) => {
        const newTodos = Array.from(todos).map(existTodo => {
            if (existTodo.id === todo.id) {
                existTodo.body = todo.body;
            }
        })

        setTodos(newTodos);
    }

    return (
        <div className={styles.container}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => {
                                return (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <input type="text" name={todo.id} value={todo.body} onChange={onChangeTodo(todo)} />
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div>
                <form>
                    <input id="body" name="body" type="text" value={body} onChange={e => setBody(e.target.value)}/>
                    <input type="submit" value="aaa" onClick={onSubmit} />
                </form>
            </div>
        </div>
    )
}
