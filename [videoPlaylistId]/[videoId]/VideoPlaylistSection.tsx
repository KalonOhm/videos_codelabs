import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import VideoPlaylistEntry from './VideoPlaylistEntry';


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
	playlistId: string;
}

// * Video Playlist Section
export default async function VideoPlaylistSection({ playlistId }: IProps) {
	// * Data
	const videoPlaylist = await getVideoPlaylist(playlistId);
	// const router = useRouter();
	// * Render
	return (
		<article className="rounded-md p-6 shadow-lg">
			{/* Title */}
			<h2 className="text-2xl font-medium text-slate-800 xl:text-3xl ">{videoPlaylist.name}</h2>

			{/* Video Count */}
			<p className="text-gray-500">{videoPlaylist.videoCount} Videos</p>

			{/* Video List */}
			<ul className="mt-6 flex flex-col space-y-6">
				{videoPlaylist.videos?.map((video) => (
					<li key={video.id} className="border-b shadow-sm transition-shadow hover:shadow">
						<VideoPlaylistEntry videoId={video.id} name={video.name} youtubeId={video.youtubeId} videoPlaylist={playlistId}></VideoPlaylistEntry>
					</li>
				))}
			</ul>
		</article>
	);
}
