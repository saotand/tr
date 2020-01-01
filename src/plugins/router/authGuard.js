import jwt from 'jsonwebtoken';
export default (to, from, next) => {
    const dctr = 'Cpvz13A1otc';
    const Token = sessionStorage.getItem('token');
    let go = false;
    // let pathto = { name: to.name };
    if (Token) {
        const tokentmp = jwt.verify(Token, dctr);
        if (tokentmp) {
            go = true;
        } else {
            sessionStorage.removeItem('token');
            go = false;
        }
    } else {
        sessionStorage.removeItem('token');
        go = false;
    }
    if (go) {
        next();
    } else {
        next({
            name: 'home'
        });
    }
};