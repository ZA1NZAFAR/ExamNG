export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Next.js + NextUI',
	description: 'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Exams',
			href: '/exams',
		},
		{
			label: 'Calendar',
			href: '/calendar',
		},
		{
			label: 'Support',
			href: '/support',
		},
		{
			label: 'FAQ',
			href: '/faq',
		},
		{
			label: 'About us',
			href: '/about',
		},
		{
			label: 'Pricing',
			href: '/pricing',
		},
		{
			label: 'Test',
			href: '/test',
		},
		{
			label: 'Home',
			href: '/home',
		}

	],
	navMenuItems: [
		{
			label: 'Profile',
			href: '/profile',
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			label: 'Projects',
			href: '/projects',
		},
		{
			label: 'Team',
			href: '/team',
		},
		{
			label: 'calendar',
			href: '/calendar',
		},
		{
			label: 'Settings',
			href: '/settings',
		},
		{
			label: 'Help & Feedback',
			href: '/help-feedback',
		},
		{
			label: 'Logout',
			href: '/logout',
		},
	],
	links: {
		github: 'https://github.com/nextui-org/nextui',
		twitter: 'https://twitter.com/getnextui',
		docs: 'https://nextui.org',
		discord: 'https://discord.gg/9b6yyZKmH4',
		sponsor: 'https://patreon.com/jrgarciadev'
	},
};
