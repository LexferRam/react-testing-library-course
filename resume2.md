# ReactJS Testing Library

### Advantages of using testing

* Catch bugs
* Increases confidence in aplication
* Speeds up QA time
* Can serve as documentations

### Types of test

1. **Unit Test**: son test que prueban un componente de forma aislada. Eje: si tenemos un componente que recibe props, si le pasamos 5 esperariamos que retorne un 5.
2. **Integration Integration**: son pruebas que prueban la interaccion entre componentes y si lo hacen de la forma apropiada. Eje: si escribo en el input y presiono en el boton la tarea se debe agregar en componete de lista de tareas.
3. **End to End Test (E2E)**: son pruebas que simulan lo que los usuarios van hacer(todo el proceso de la aplicacion)

### Test Block
```javascript
  it('renders react link', () => {

      // Render a component that we are going to test
      render(<App/> );

      // Find elements we want to interact with
      const linkElement = screen.getByText(/learn react/i);

      //Interact with those elements (fireEvent)

      //Assert that the results are as expected
      expect(linkElement). toBeInTheDocument()
  });  
```

### Query Methods

|              |                  getBy                   |                                   findBy | queryBy                                  |                getAllBy                 |                               findAllBy |                              queryAllBy |
| ------------ | :--------------------------------------: | ---------------------------------------: | ---------------------------------------- | :-------------------------------------: | --------------------------------------: | --------------------------------------: |
| **No Match** |  <span style="color: red">error</span>   |    <span style="color: red">error</span> | null                                     |  <span style="color: red">error</span>  |   <span style="color: red">error</span> | <span style="color: green">array</span> |
| **1 Match**  | <span style="color: green">return</span> | <span style="color: green">return</span> | <span style="color: green">return</span> | <span style="color: green">array</span> | <span style="color: green">array</span> | <span style="color: green">array</span> |
| **1+ Match** |  <span style="color: red">error</span>   |    <span style="color: red">error</span> | <span style="color: red">error</span>    | <span style="color: green">array</span> | <span style="color: green">array</span> | <span style="color: green">array</span> |
| **Await**    |                    no                    |                                      yes | no                                       |                   no                    |                                     yes |                                      no |

**NOTA**: el mas comun que se usa es el metodo getBy

### Priority of methods to use in tests

Este orden de prioridad esta basado en funciones que emulan o que mas se parecen a las acciones que puede tomar un usuario.

1. **Accesible by Everyone**

   * getByRole
   * getByLabelText
   * getByPlaceholderText
   * getByText
  
2. **Semantic Queries**

   * getByAltText
   * getByTitle
  
3. **Test ID**

   * getByTextId

### FIRE events

* fireEvent.[evento(element, target)] es la fn que usamos para ejecutar un evento, viene de la libreria '@testing-library/react'

### Configuracion en package.json de jest

resetMocks: false ==> para que no resetee los mocks

```js
"jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    "resetMocks": false
  }
```

## Testing initial rendering
**NOTA**: usar ==>  screen.debug() cuanod queremos ver el codigo del html en cualquier punto del test 

**Prueba de renderizado de un elemento**
```javascript
    it('should render input element', () => {
        render(
            <AddInput
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        expect(inputElement).toBeInTheDocument();
    });

    it('Renders correctly initial document', () => {

        //querySelectorAll returns all the html inputs elements
        const inputs  = container.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].name).toBe('login');
        expect(inputs[1].name).toBe('password');
        expect(inputs[2].value).toBe('Login');

        const label = container.querySelector('label');
        expect(label).not.toBeInTheDocument();

     })
```

**Prueba de onchange en un input**
```javascript
    const mockedSetTodo = jest.fn();

    it('should be able to type into input', () => {
        render(
            <AddInput
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        // fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } })
        expect(inputElement.value).toBe("Go Grocery Shopping");
    });
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

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

    it('should be able to type into input', () => {
        render(
            <MockTodo />
        );
        addTask(["Go Grocery Shopping"])
        const divElement = screen.getByText(/Go Grocery Shopping/i);
        expect(divElement).toBeInTheDocument()
    });

    //PRUEBA QUE REDERICE VARIOS ELEMENTOS
    it('should render multiple items', () => {
        render(
            <MockTodo />
        );
        addTask(["Go Grocery Shopping", "Go Grocery Shopping", "Go Grocery Shopping"])
        const divElements = screen.queryAllByText(/Go Grocery Shopping/i);
        expect(divElements.length).toBe(3)
    });
```

**Prueba limpiar campo cuando se da click al btn Add**
```javascript
    const mockedSetTodo = jest.fn();

    it('should have empty input when add button is cliked', () => {
        render(
            <AddInput
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
        const buttonElement = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(buttonElement)
        expect(inputElement.value).toBe("")
    });
```

**Prueba pasando props a un componente y probando que lo renderice**
```javascript
    it('should render same text passed into title prop', () => {
        render(
            <Header
                title="todo"
            />
        );
        const h1Element = screen.getByText(/todo/i);
        expect(h1Element).toBeInTheDocument();
    });
```

**Prueba de buqueda asincrona**
```javascript
    // // FINDBY : es usado para cuando necesecitamos que la busqueda sea asincrona (debemos usar async-await)
    it('should render same text passed into title prop', async () => {
        render(
            <Header 
            title="todo"
            />
        );
        const h1Element = await screen.findByText(/todo/i);
        expect(h1Element).toBeInTheDocument();
    });
```

**Uso de queryBy (retorna null si no consigue)**
```javascript
    // QUERYBY: lo usamos cuando queremos probar un busqueda que sabemos que 
    //  no encontrara y no queremos que falle ya que retornara null
    it('should render same text passed into title prop', () => {
        render(
            <Header 
            title="todo"
            />
        );
        const h1Element = screen.queryByText(/dogs/i);
        expect(h1Element).not.toBeInTheDocument
    });
```

**Uso de getAllBy (retorna un array con las coincidencias)**
```javascript
// GETALLBY: retorna un array si consigue mas de un elemento segun el query usado
it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Elements = screen.getAllByText(/todo/i);
    expect(h1Elements.length).toBe(1);
});
```

**Prueba que un elemento tenga una clase especifica**
```javascript
it('task should not have complete class when initally rendered', () => {
    render(
        <MockTodo />
    );
    addTask(["Go Grocery Shopping"])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).not.toHaveClass("todo-item-active")
});
```

**Prueba de que un elemento tiene un a clase especifica desplues de ser clicqueado**
```javascript
    it('task should have complete class when clicked', () => {
        render(
            <MockTodo />
        );
        addTask(["Go Grocery Shopping"])
        const divElement = screen.getByText(/Go Grocery Shopping/i);
        fireEvent.click(divElement)
        expect(divElement).toHaveClass("todo-item-active")
    });
```

### Test login form

```js

    // Mock login service with spyOn
    const loginServiceSpy = jest.spyOn(LoginService.prototype, 'login')

     it("Passed credentials correctly",() => {
        const inputs = container.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2]; 

        //simulates a change input event 
        //1rst param = on what we want to make the change event
        //2nd param = value of the change event
        fireEvent.change(loginInput,{target:{value:'someUser'}});
        fireEvent.change(passwordInput,{target:{value:'somePass'}});
        //simulate an event(click event)
        fireEvent.click(loginButton)
        //simulates the call to login service
        expect(loginServiceSpy).toBeCalledWith('someUser','somePass')
        
     })
```

### Test Login fail 

```js
     it("It renders correctly status label - invalid login",async () => {

        loginServiceSpy.mockResolvedValueOnce(false)

        const inputs = container.querySelectorAll('input');
        const loginButton = inputs[2];

        fireEvent.click(loginButton)
 
        //check if label is in the document after login 
      //   const statusLabel = await waitForElement(() => container.querySelector('label'))
        const statusLabel = screen.findAllByLabelText('label')

        expect(statusLabel).toBeInTheDocument()
        expect(statusLabel).toHaveTextContent('Login failed')
     })
```

### Test list return from an API

```js
  import data from './data' //json mock que retorna la API

  it("Should show a list of characters from the API", async () => {
    window.fetch.mockResolvedValueOnce({
      ok:true,
      json:() => data,
    })

    render(<MockApp />);

    for(let character of data.results){
      expect(await screen.findByText(character.name)).toBeInTheDocument()
    }

  })
```


**Otros metodos**

* expect(pElement).toBeTruthy()
* expect(pElement).toBeVisible()
* expect(pElement).toContainHTML('p');//verifica si tiene una etiqueta <p></p>
* expect(pElement).toHaveTextContent("1 task left")
* expect(pElement).not.toBeFalsy();
* expect(pElement.textContent).toBe("1 task left");