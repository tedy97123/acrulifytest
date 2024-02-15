import express from "express";
const router = express.Router(); 

router.get("/",(res,req) => {
   console.log(req.oidc.isAuthenticated() 
   ? "yes" : "no");
});

export default router;
