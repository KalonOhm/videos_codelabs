import MainHeading from '@/components/Typography/MainHeading';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// * Get Video Playlist
async function getVideoPlaylist(videoPlaylistId: string) {
	// * Query
	const videoPlaylist = await prisma.videoPlaylist.findUnique({
		where: {
			id: videoPlaylistId,
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

	if (!videoPlaylist) return notFound();

	// * Format Data
	const formattedData = {
		name: videoPlaylist.name,
		videoCount: videoPlaylist._count.videos,
		videos: videoPlaylist.videos.map((video) => ({
			id: video.video.id,
			name: video.video.name,
			youtubeId: video.video.videoId,
		})),
	};

	return formattedData;
}

// * Props
interface IProps {
	params: {
		videoPlaylistId: string;
	};
}

// * Videos Page
export default async function VideoPlaylistPage({ params }: IProps) {
	// * Data
	const videoPlaylist = await getVideoPlaylist(params.videoPlaylistId);

	return (
		<>
			<MainHeading>Video Playlist Page</MainHeading>

			<section className="flex h-screen w-full flex-col items-center justify-center bg-slate-100">
				<h2 className="text-3xl font-bold text-slate-900">{videoPlaylist.name}</h2>

				<ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{videoPlaylist.videos.map((video) => (
						<li key={video.id}>
							<Link
								className=" justify-centerw-32 flex h-40 flex-col items-start  rounded-lg bg-slate-200 p-4 shadow-lg hover:bg-slate-300"
								href={`/videos/${params.videoPlaylistId}/${video.id}`}
							>
								<h3 className="text-2xl font-bold text-slate-900">{video.name}</h3>
								<p className="text-lg text-slate-700">{video.youtubeId}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
