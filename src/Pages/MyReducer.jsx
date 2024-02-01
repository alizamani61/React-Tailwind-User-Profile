import { useEffect, useReducer } from "react";
const initialTodos = [
    {
        id: 1,
        firstname: 'mark',
        lastname: 'moein',
        isComplete: false,
    },
    {
        id: 2,
        firstname: 'mic',
        lastname: 'oman',
        isComplete: false,
    },
];

let reducer = (state, action) => {
    switch (action.type) {
        case 'ISCOMPLETE':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    return { ...todo, isComplete: !todo.isComplete }
                } else {
                    return todo;
                }
            });
        case 'EDIT':
            return state.map((todo) => {
                if (action.id === todo.id) {
                    return { ...todo, [action.fieldname]: action.name }
                } else {
                    return todo;
                }
            });
        case 'ADD':
            return  [...state, {id: Math.floor(Math.random() * 10000), firstname: action.name, lastname: action.name, isComplete: false} ];
            
        default:
            return state;

    }
}

const MyReducer = props => {

    const [todos, dispatch] = useReducer(reducer, initialTodos);

    const handleComplete = (todo) => {
        dispatch({ type: "ISCOMPLETE", id: todo.id });
    };

    const handleEdit = (todo, e) => {
        let fieldname = e.target.name;
        let fieldvalue = e.target.value;

        dispatch({ type: "EDIT", id: todo.id, fieldname: fieldname, name: fieldvalue });
    }

    const handleAdd = (todoname) => {
        dispatch({ type: "ADD", name: todoname });
    }

    useEffect(() => {
        

    })
    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={todo.isComplete}
                            onChange={() => handleComplete(todo)}
                        />
                        {todo.name} {todo.id}
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        value={todo.firstname}
                        onChange={(e) => handleEdit(todo, e)}
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={todo.lastname}
                        onChange={(e) => handleEdit(todo, e)}
                    />
                </div>
            ))}

            <button onClick={(e) => handleAdd('ali3')}>ADD</button>
            <button onClick={(e) => console.log(todos)}>Show in console</button>
        </div>
    )
};
export default MyReducer;

