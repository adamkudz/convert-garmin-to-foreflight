import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/FrontLayout.vue'),
		children: [
			{
				path: '',
				name: 'front',
				component: () => import('src/pages/FrontPage.vue'),
				meta: { requiresAuth: false },
			},
		],
	},

	{
		path: '/help',
		component: () => import('layouts/FrontLayout.vue'),
		children: [
			{
				path: '',
				name: 'helppage',
				component: () => import('src/pages/HelpPage.vue'),
				meta: { requiresAuth: true },
			},
		],
	},

	{
		path: '/errordesktoponly',
		component: () => import('pages/ErrorDesktopOnly.vue'),
		name: 'errordesktoponly',
	},

	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
