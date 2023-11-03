export const myProfile = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
