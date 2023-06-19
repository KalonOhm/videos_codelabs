'use client';

import cn from '@/utils/classNames';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { motion } from 'framer-motion';

import NavItems from '@/components/Navigation/NavItems';
import Image from 'next/image';
import Link from 'next/link';
import wideLogo from '../../../public/static/logo-wide.png';

export default function SidebarMenuContainer() {
	// * State
	const [isExpanded, setExpanded] = useState(false);

	return (
		<section className="fixed top-0 left-0">
			{/* Button */}
			<motion.button
				className={cn(
					'fixed top-0 left-0 z-50 m-4 flex items-center justify-center rounded-full bg-green-800 p-2.5 outline-none ring-2 ring-green-50 hocus:bg-green-700'
				)}
				type="button"
				onClick={() => setExpanded((prev) => !prev)}
				aria-expanded={isExpanded}
				aria-label="Toggle Menu"
				animate={{ rotate: isExpanded ? 180 : 0 }}
				transition={{ type: 'spring', stiffness: 200, damping: 30 }}
			>
				{isExpanded ? (
					<XMarkIcon className="h-6 w-6 text-green-50" />
				) : (
					<Bars3BottomLeftIcon className="h-6 w-6 text-green-50" />
				)}
			</motion.button>

			{/* Menu */}
			{isExpanded && (
				<motion.nav
					className={cn('fixed top-0 left-0 z-40 h-screen w-64 bg-green-800 text-green-50 md:w-20 lg:w-64')}
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					transition={{ type: 'spring', stiffness: 200, damping: 30 }}
				>
					{/* Logo */}
					<Link className="mt-5 -mb-10 block md:mb-3 md:hidden lg:block" href="/">
						<Image className="ml-auto mr-3 w-40" src={wideLogo} alt="logo" />
					</Link>

					{/* Nav Links */}
					<NavItems isOpen={isExpanded} />
				</motion.nav>
			)}
		</section>
	);
}
