const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {path:"/", redirect:"/login"},
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") }
    ],
    meta: {auth: false}
  },

  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: '', component: () => import("pages/IndexPage.vue") },
      { path: "reviewform", component: () => import("pages/ReviewForm.vue") },
      { path: "profile", component: () => import("pages/ProfilePage.vue") }

    ],
    meta: {auth: true}
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
