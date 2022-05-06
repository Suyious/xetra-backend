const express = require("express");
const { newOrder, getOrderDetails, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getOrderDetails);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/order/").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports = router;