import Container from '@/components/Layouts/Container';
import { PropsWithChildren } from 'react';
import SidebarMenuContainer from './SidebarMenuContainer';

export default function VideosLayout({ children }: PropsWithChildren) {
	return (
		<>
			{/* Sidebar Menu w/ Toggler */}
			<SidebarMenuContainer />

			{/* Main Content */}
			<main className="py-6">
				<Container>{children}</Container>
			</main>
		</>
	);
}
