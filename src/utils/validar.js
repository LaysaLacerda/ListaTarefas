export function validarBody(body) {
    if (body.title == null || body.title == undefined ||  body.title == '') {
        return false
    }
    if (body.description == null || body.description == undefined || body.description == '') {
        return false
    }
    return true
}

