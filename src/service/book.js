import { message } from 'antd'
import {BASEURL, get, getJson} from './common'

export async function getAllBookData(){
    const url = `${BASEURL}/home`
    let books;
    try {
        books = await getJson(url);
        // console.log(books)
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

export async function searchBooks(keyword, pageIndex, pageSize) {
    const url = `${BASEURL}/books?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    // console.log(url);
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function searchAuthorByBook(keyword) {
    const url = `${BASEURL}/microservice/getBookAuthorByName/${keyword}`;
    let author;
    try {
        let ans = await getJson(url);
        console.log(ans);
        author = ans.data;
        console.log(author);
    } catch (e) {
        console.log(e);
        author = null;
    }
    return author;
}

export async function getBestSellingBooks() {
    const url = `${BASEURL}/books/rank`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = null;
    }
    return books;
}

// export async function getUserTopBook(username) {
//     const url = `${BASEURL}/books/user_top?username=${username}`;
//     let books;
//     try {
//         books = await getJson(url);
//     } catch (e) {
//         console.log(e);
//         books = null;
//     }
//     return books;
// }

export async function addBook(book) {
    const url = `${BASEURL}/books/add`;
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book),
            credentials: "include"
        });
        message.success("添加成功");
    } catch (e) {
        console.log(e);
        response = null;
        message.error("添加失败");
    }
    return response;
}

export async function updateBook(updatedBook) {
    const url = `${BASEURL}/books/update`;
    console.log(JSON.stringify({updatedBook}));
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({updatedBook}),
            credentials: "include"
        });
        message.success("书籍库存修改成功");
    } catch (e) {
        console.log(e);
        response = null;
        message.error("修改失败，请重试");
    }
    return response;
}

export async function deleteBook(id) {
    const url = `${BASEURL}/books/delete`;
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id}),
            credentials: "include"
        });
        message.success("删除成功");
    } catch (e) {
        console.log(e);
        response = null;
        message.error("删除失败，请重试");
    }
    return response;
}