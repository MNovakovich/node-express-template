export const authMiddreware = (req, res, next) => {
  req.prdez = 'tralalal';
  next();
};
