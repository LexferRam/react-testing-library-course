import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';

describe("Header", () => {
    it('should render same text passed into title prop', () => {
        render(
            <Header
                title="todo"
            />
        );
        const h1Element = screen.getByText(/todo/i);
        expect(h1Element).toBeInTheDocument();
    });

})

// it('should render same text passed into title prop', () => {
//     render(
//         <Header 
//           title="todo"
//         />
//     );
//     const h1Element = screen.getByRole("heading");
//     expect(h1Element).toBeInTheDocument();
// });

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    //busca por el rol y por el texto usando 'name'
    const h1Element = screen.getByRole("heading", { name: /todo/i });
    fireEvent.click(h1Element)
    // expect(h1Element).toBeInTheDocument();
    const alertMsg = screen.getByText(/Hello alert!/i);
    expect(alertMsg).toBeInTheDocument();
});

//********<h3 title="Header" className="header">Cats</h3> *******************/
//****busca por el atributo del tag llamado title ***************************/
// it('should render same text passed into title prop', () => {
//     render(
//         <Header 
//           title="todo"
//         />
//     );
//     const h1Element = screen.getByTitle("Header");
//     expect(h1Element).toBeInTheDocument();
// });


//********<h3 data-testid="header-2" className="header">Cats</h3> *******************/
//*******busca por el atributo del tag llamado data-testid *********************/
// it('should render same text passed into title prop', () => {
//     render(
//         <Header 
//           title="todo"
//         />
//     );
//     const h2Element = screen.getByTestId("header-2");
//     expect(h2Element).toBeInTheDocument();
// });

// // // FINDBY : es usado para cuando necesecitamos que la busqueda sea asincrona (debemos usar async-await)
// it('should render same text passed into title prop', async () => {
//     render(
//         <Header 
//           title="todo"
//         />
//     );
//     const h1Element = await screen.findByText(/todo/i);
//     expect(h1Element).toBeInTheDocument();
// });

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


