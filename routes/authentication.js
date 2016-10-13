function authentication (req, res, next) {
   if (!req.session.user) {
       req.session.error = '请登录';
       return res.redirect('/');
   }
   next();
}

module.exports = authentication;
