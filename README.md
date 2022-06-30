# React testing Library Notes

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

* Usar it o test es equivalente, y el 1er parametro que reciben es la descripcion del test a realizar
* Partes de un test block(como estructurarlo):
    1. Render a component taht we are going to test
    2. Find elements we want to interact with
    3. Interact with those elements
    4. Assertthat the results are as expected

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


**NOTA**:Para que mock request se tome de la carpeta __mocks__>axios(de lo contrario tratara de hacer la peticion con el axios normal) ir al node_modules y modificar la carpeta "react-script">"scripts">"utils">"createJestConfig.js" y en la linea 69 en la propiedad resetMocks: true ==> pasarlo a false


### Hooks de testing

    // beforeEach(() => {
    //     // console.log("RUNS BEFORE EACH TEST")
    //     jest.mock("../../../__mocks__/axios")
    // })

    // beforeAll(() => {
    //     console.log("RUNS ONCE BEFORE ALL TESTS")
    // })

    // afterEach(() => {
    //     console.log("RUNS AFTER EACH TEST")
    // })

    // afterAll(() => {
    //     console.log("RUNS ONCE AFTER ALL TESTS")
    // })

**NOTA**: si se usan dentro de un describe() los hooks solo seran aplicados a los bloques de test dentro de este

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

### Mocks Axios request

```js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

## Debugging Tests in Visual Studio Code

* seleccionar la opcion de "debugg"
* Colocar el punto de pararda 
* Ejecutar el debbug seleccionando el icono de play 

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--watchAll=false"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "env": { "CI": "true" },
      "disableOptimisticBPs": true
    }
  ]
}
```

### Test render inicial

```js
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
---
---

## Mock Server (Mock Server Worker)
 
```javascript
import React from "react"
import { render, screen } from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"

import { MainPage } from "../components/main-page"

const fakeQuotes = [
  { quote: "Gah, stupid sexy Flanders!" },
  { quote: "Eat my shorts" },
  { quote: "Shut up, brain. I got friends now. I don't need you anymore" },
]

const server = setupServer(
  rest.get("/quotes", (req, res, ctx) => {
    return res(ctx.json(fakeQuotes))
  })
)
```

En seguida, agrego lo siguiente para hacer que el server se levante antes de correr las pruebas y se cierre ya que finalicen:

```js
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Disable API mocking after the tests are done.
afterAll(() => server.close())
```

Ahora modifico mi prueba existente sobre el contenido de las citas:

```js
  it("must contain quote value", async () => {
    const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole(
      "listitem"
    )

    const [fakeOne, fakeTwo, fakeThird] = fakeQuotes
    expect(firstQuote.textContent).toBe(fakeOne.quote)
    expect(secondQuote.textContent).toBe(fakeTwo.quote)
    expect(thirdQuote.textContent).toBe(fakeThird.quote)
  })
```


## Test Driven Development o Desarrollo dirigido por pruebas

<image src="./src/assets/images/tdd-flow.svg" width="400px" height="400px" />

Test Driven Development is a technique for developing software that consists of short cycle, in which you first write an automated test that fails, then do the minimum necessary to make it pass, and finally do a refactor.

Cycle <span style="color:red">Red</span>, <span style="color:green">Green</span>, <span style="color:blue">Refactor</span>
The Red, Green, Refactor cycle is the essence of TDD and consists of:

<span style="color:red">RED</span>: Start by creating an automated test that fails out of the box. Typically, a failed test is colored red in test runners.

<span style="color:green">GREEN</span>: Do the minimum necessary for the test to pass. Usually, a test that passes has a green color in a test runner.

<span style="color:blue">REFACTOR</span>: Apply refactor techniques and good practices in the code created so far. SOLID principles or others, for example.

**NOTA**:
¡los tests deben ser considerados como parte del desarrollo de la funcionalidad!