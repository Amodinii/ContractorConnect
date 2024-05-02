// Middleware to authorize company users
export function authorizeCompany(req, res, next) {
  console.log("Authorization is working");
  console.log(req.user.userType);
  if (req.user.userType !== "Company") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}

// Middleware to authorize contractor users
export function authorizeContractor(req, res, next) {
  console.log("Authorization is working");
  console.log(req.user.userType);
  if (req.user.userType !== "Contractor") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}
