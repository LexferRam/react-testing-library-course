# React testing Library Notes

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
