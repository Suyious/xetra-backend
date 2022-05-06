const express = require("express");
const { createCollection, getAllCollections, getAllCollectionProducts } = require("../controllers/collectionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/collection/new").post( isAuthenticatedUser, authorizeRoles("admin"), createCollection)
router.route("/collections").get( getAllCollections)
router.route("/collection/:id").get( getAllCollectionProducts);


module.exports = router;