import { Loan } from "./Loan";

export const LOAN_DATA_LIST : Loan[] = [
    { id: 1, client: { id: 1, name: 'Gugulethu Orla'}, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, startDate: new Date(), endDate: new Date()},
    { id: 2, client: { id: 1, name: 'Gugulethu Orla'}, game: { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, startDate: new Date(), endDate: new Date()},
    { id: 3, client: { id: 2, name: 'Vaishnavi Ngải' }, game: { id: 3, title: 'Juego 3', age: 4, category: { id: 1, name: 'Categoría 1' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, startDate: new Date(), endDate: new Date()},
    { id: 4, client: { id: 3, name: 'Oscar Yakim' }, game: { id: 4, title: 'Juego 4', age: 10, category: { id: 2, name: 'Categoría 2' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, startDate: new Date(), endDate: new Date()},
]