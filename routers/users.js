import { Router } from "express";

const router = Router();

//getting the profile data from the database.
router.get("/profile", async (req, res) => {
  try {
    // Retrieve the user ID from the session
    const userId = req.session.userId;

    // Query the database to find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (user) {
      //printing to see if the details will be retrieved or not
      console.log("User details:", user);

      // If the user exists, render the profile page with the user data
      res.render("ProfilePage", { user });
    } else {
      // If the user doesn't exist, handle the error accordingly
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching user data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
