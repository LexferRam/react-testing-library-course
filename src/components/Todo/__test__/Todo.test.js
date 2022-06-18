import { render, screen, fireEvent, getByDisplayValue } from '@testing-library/react';
import Todo from "../Todo"
import { BrowserRouter } from "react-router-dom"

const MockTodo = () => {
    return (
        <BrowserRouter>
            <Todo />
        </BrowserRouter>
    )
}

const addTask = (tasks) => {
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    tasks.forEach((task) => {
        fireEvent.change(inputElement, { target: { value: task } });
        fireEvent.click(buttonElement);
    })
}

// integration test
// it("should render same text passed into title prop", () => {
//     render(<MockTodo />)
//     const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
//     const buttonElement = screen.getByRole("button", { name: /Add/i })
//     fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
//     fireEvent.click(buttonElement)
//     const divElement = screen.getByText(/Go Grocery Shopping/i)
//     expect(divElement).toBeInTheDocument()
// })

it("",() => {
    render(<MockTodo/>)

    const inputElement = screen.getByPlaceholderText(/Add todo.../i);
    const buttonElement = screen.getByRole('button',{name:/Add/i})

    fireEvent.change(inputElement, {target: {value:"Test de lexfer"}});
    fireEvent.click(buttonElement)

    const divElement = screen.getElementByText(/test de lexfer/i)
    expect(divElement).toBeInTheDocument()
})

it('should be able to type into input', () => {
    render(
        <MockTodo />
    );
    addTask(["Go Grocery Shopping"])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument()
});

it('should render multiple items', () => {
    render(
        <MockTodo />
    );
    addTask(["Go Grocery Shopping", "Go Grocery Shopping", "Go Grocery Shopping"])
    const divElements = screen.queryAllByText(/Go Grocery Shopping/i);
    expect(divElements.length).toBe(3)
});

it('should render multiple items', () => {
    render(
        <MockTodo />
    );
    addTask(["Go Grocery Shopping", "Go Grocery Shopping", "Go Grocery Shopping"])
    const divElements = screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3)
});

it('task should not have complete class when initally rendered', () => {
    render(
        <MockTodo />
    );
    addTask(["Go Grocery Shopping"])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).not.toHaveClass("todo-item-active")
});

it('task should have complete class when clicked', () => {
    render(
        <MockTodo />
    );
    addTask(["Go Grocery Shopping"])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    fireEvent.click(divElement)
    expect(divElement).toHaveClass("todo-item-active")
});

