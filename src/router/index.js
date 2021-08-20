import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: function (to) {
		if (to.hash) {
			return {
				el: to.hash
			}
		} else {
			return { bottom: 0 }
		}
	},
	
});

export default router;
