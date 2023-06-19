import MainHeading from '@/components/Typography/MainHeading';
import getServerSession from '@/lib/getServerSession';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// * Get all Playlists for User
async function getUserPlaylists() {
	// * Contexts
	const session = await getServerSession();

	// * Query
	// Get all Lesson IDs for User
	const userLessons = await prisma.user.findUnique({
		where: {
			id: session?.user.id!,
		},
		select: {
			groups: {
				where: {
					AND: [{ isStudent: true }, { group: { status: 'ACTIVE' } }],
				},
				select: {
					group: {
						select: {
							lessons: {
								where: {
									date: {
										lte: new Date(new Date().setDate(new Date().getDate() + 7)),
									},
								},
								select: {
									lesson: {
										select: {
											id: true,
										},
									},
								},
							},
						},
					},
				},
			},
		},
	});
	const userLessonIds = userLessons?.groups.flatMap((group) => group.group.lessons.map((lesson) => lesson.lesson.id));

	// Get all Playlists based on Lesson IDs
	const userPlaylists = await prisma.videoPlaylist.findMany({
		where: {
			videos: {
				some: {
					videoId: {
						in: userLessonIds,
					},
				},
			},
		},
		select: {
			id: true,
			name: true,
			_count: {
				select: {
					videos: true,
				},
			},
			videos: {
				select: {
					videoNumber: true,
					video: {
						select: {
							id: true,
							name: true,
							videoId: true,
						},
					},
				},
			},
		},
	});

	// * Format
	// Format return data to be more readable and usable for frontend
	const formattedPlaylists = userPlaylists?.map((playlist) => ({
		id: playlist.id,
		name: playlist.name,
		videoCount: playlist._count.videos,
		videos: playlist.videos.map((video) => ({
			videoNumber: video.videoNumber,
			name: video.video.name,
			videoId: video.video.id,
			youtubeId: video.video.videoId,
		})),
	}));

	return formattedPlaylists; // Return the formatted data
}

// * Videos Page
export default async function VideosPage() {
	// * Data
	const userPlaylists = await getUserPlaylists();

	// * Render
	return (
		<>
			<MainHeading>Videos Page</MainHeading>

			<p className="text-lg text-slate-600">
				View all the lesson playlists and nested lessons for this current user logged in.
			</p>

			<section className="mt-8">
				{userPlaylists?.map((playlist) => (
					<div
						className="mb-4 flex flex-col space-y-3 rounded-lg bg-slate-100 p-4 shadow-lg"
						key={playlist.id}
					>
						<h2 className="text-2xl font-bold text-slate-700">{playlist.name}</h2>
						<Link
							className="w-32 rounded-lg bg-slate-200 p-4 shadow-lg hover:bg-slate-300"
							href={`/videos/${playlist.id}`}
						>
							View Playlist
						</Link>

						<p className="text-lg text-slate-700">Videos: {playlist.videoCount}</p>

						<ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{playlist.videos.map((video) => (
								<li className="flex flex-col items-start justify-center" key={video.videoId}>
									<Link
										className="rounded-lg bg-slate-200 p-4 shadow-lg hover:bg-slate-300"
										href={`/videos/${playlist.id}/${video.videoId}`}
									>
										<p className="text-lg text-slate-700">
											Video Number:{' '}
											<span className="font-bold text-green-700">{video.videoNumber}</span>
										</p>
										<p className="text-lg text-slate-700">
											Video Name: <span className="font-bold text-green-700">{video.name}</span>
										</p>
										<p className="text-lg text-slate-700">
											YouTube Video ID:{' '}
											<span className="font-bold text-green-700">{video.youtubeId}</span>
										</p>
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</>
	);
}
