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

    // Render a component taht we are going to test
    render(<App/> );

    // Find elements we want to interact with
    const linkElement = screen.getByText(/learn react/i);

    //Interact with those elements

    //Assertthat the results are as expected
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


### Prorioty of using Methods

* **Accessible by Everyone**
- getByRole
- getByLabelText
- getByPlaceholderText
- getByText

* **Semantic queries**
- getByAllText
- getByTitle

* **Test ID**
- getByTestId


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