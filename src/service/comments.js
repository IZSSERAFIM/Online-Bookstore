import { message } from 'antd'
import {BASEURL, post, getJson} from './common'

export async function getCommentsById(id){
    const url = `${BASEURL}/comment?id=${id}`
    let comments
    try{
        comments = getJson(url)
    }catch (e){
        console.log(e)
        comments = []
    }
    return comments
}

export async function postComment(comment){
    const url = `${BASEURL}/comment/post`
    let res
    try{
        res = post(url, comment)
        message.success("评论成功")
    }catch(e){
        console.log(e)
        res = {
            ok: false,
            message: "Post Comment Failed."
        }
    }
    return res
}