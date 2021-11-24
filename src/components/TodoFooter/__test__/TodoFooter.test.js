import { render, screen } from '@testing-library/react';
import TodoFooter from "../TodoFooter"
import { BrowserRouter } from "react-router-dom"

const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
  return (
    <BrowserRouter>
      <TodoFooter
        numberOfIncompleteTasks={numberOfIncompleteTasks}
      />
    </BrowserRouter>
  )
}

describe("TodoFooter", () => {
  it('should render the correct amount of incomplete tasks', () => {
    render(
      <MockTodoFooter
        numberOfIncompleteTasks={5}
      />
    );
    const pElement = screen.getByText(/5 tasks left/i);
    expect(pElement).toBeInTheDocument();
  });

  it('should render "task" when the number of incomplete tasks is one', () => {
    render(
      <MockTodoFooter
        numberOfIncompleteTasks={1}
      />
    );
    const pElement = screen.getByText(/1 task left/i);
    expect(pElement).toBeInTheDocument();
  });
})

// it('p element should be truthy when the number of incomplete tasks is one', () => {
//   render(
//       <MockTodoFooter 
//         numberOfIncompleteTasks={1}
//       />
//   );
//   const pElement = screen.getByText(/1 task left/i);
//   expect(pElement).toBeTruthy();//verifica si el resultado es true
// });

// it('"task" should be visible when the number of incomplete tasks is one', () => {
//   render(
//       <MockTodoFooter 
//         numberOfIncompleteTasks={1}
//       />
//   );
//   const pElement = screen.getByText(/1 task left/i);
//   expect(pElement).toBeVisible();//verifica si el componente es visible al usuario
// });

// it('should contain p tag with correct text', () => {
//   render(
//       <MockTodoFooter 
//         numberOfIncompleteTasks={1}
//       />
//   );
//   const pElement = screen.getByText(/1 task left/i);
//   expect(pElement).toContainHTML('p');//verifica si tiene una etiqueta <p></p>
// });

// it('should render correct text content', () => {
//   render(
//       <MockTodoFooter 
//         numberOfIncompleteTasks={1}
//       />
//   );
//   const pElement = screen.getByText(/1 task left/i);
//   expect(pElement).toHaveTextContent("1 task left");//suponiendo que la linea anterior sea la busqueda se haga por getByTestId() entonces usariamos toHaveTextContent() para verificar si tiene el texto pasado por parametro
// });

// it('should render correct text content', () => {
//   render(
//       <MockTodoFooter 
//         numberOfIncompleteTasks={1}
//       />
//   );
//   const pElement = screen.getByText(/1 task left/i);
//   expect(pElement).not.toBeFalsy();
// });

// it('should render correct text content', () => {
//   render(
//       <MockTodoFooter 
//         numberOfIncompleteTasks={1}
//       />
//   );
//   const pElement = screen.getByText(/1 task left/i);
//   expect(pElement.textContent).toBe("1 task left");
// });