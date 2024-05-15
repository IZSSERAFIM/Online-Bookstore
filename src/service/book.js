import {BASEURL, get, getJson} from './common'

export async function getAllBookData(){
    const url = `${BASEURL}/home`
    let books;
    try {
        books = await getJson(url);
        console.log(books)
    } catch(e) {
        console.log(e);
        books = {books: []}
    }
    return books;
}

export async function getBookById(id){
    const url = `${BASEURL}/book?id=${id}`
    let book;
    try {
        book = await getJson(url);
    } catch(e) {
        console.log(e);
        book = {book: []}
    }
    return book;
}

export async function getHelloText(){
    const url = `${BASEURL}`
    let text = await get(url);
    return text;
}