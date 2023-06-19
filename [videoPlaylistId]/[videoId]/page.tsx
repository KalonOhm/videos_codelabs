import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import VideoContentLeft from './VideoContentLeft';
import VideoContentRight from './VideoContentRight';

// * Get Video
async function getVideo(videoId: string, playlistId: string) {
	// console.log (videoId, playlistId)

	// * Query
	const video = await prisma.video.findUnique({
		where: {
			id: videoId,
		},
		select: {
			id: true,
			name: true,
			videoId: true,
			subjects: true,
		},
	});
	// console.log(video)

	// * Get the next video in the playlist
	// const nextVideo = ''
	const currentPlaylist = await prisma.videoPlaylist.findUnique({
		where: {
			id: playlistId,
		},
		include: {
			videos: true,
			_count: {
				select: { videos: true },
			},
		},
	});
	// console.log(currentPlaylist)

	// * get the index of the current video
	const currentVideoIndex = currentPlaylist?.videos.findIndex((video) => video.videoId === videoId)!;
	// console.log(currentVideoIndex)

	// * get the next video
	const nextVideo = currentPlaylist?.videos[currentVideoIndex + 1]?.videoId;
	// const nextVideo = currentPlaylist?.videos[nextIndex].videoId;
		console.log(nextVideo);
	
	
	// * if no next video, get the next playlist

	let nextPlaylistId: string | undefined;
	let nextPlaylistVideo: string | undefined;
	if (!nextVideo) {
		const playlists = await prisma.videoPlaylist.findMany({
			select: {
				id: true,
				videos: {
					select: {
						video: {
							select: {
								id: true,
								videoId: true,
							},
						},
					},
				},
			},
		});
		// console.log(playlists)
		const playlistIndex = playlists.findIndex((playlist) => playlist.id === playlistId);
		// console.log(playlistIndex)
		const nextPlaylistIndex = playlists[playlistIndex + 1];
		// console.log(nextPlaylistIndex)
		if (nextPlaylistIndex) {
			nextPlaylistId = nextPlaylistIndex.id;
			nextPlaylistVideo = nextPlaylistIndex.videos[0]?.video.id;
		}
	}

	if (!video) {
		return notFound();
	}

	// * Format Data
	const formattedData = {
		id: video.id,
		name: video.name,
		youtubeId: video.videoId,
		subjects: video.subjects,
	};

	return { 
		video: formattedData, 
		nextVideoUrl: nextVideo 
		? `videos/${playlistId}/${nextVideo}`
		: nextPlaylistId
		? `videos/${nextPlaylistId}/${nextPlaylistVideo}`
		: undefined
	};
}

// * Props
interface IProps {
	params: {
		videoPlaylistId: string;
		videoId: string;
	};
}

// * Video Page
export default async function VideoPage({ params }: IProps) {
	// * Data
	const { video, nextVideoUrl } = await getVideo(params.videoId, params.videoPlaylistId);

	// * Render
	return (
		<section className="flex flex-col justify-between gap-12 lg:flex-row">
			{/* Left (Video Frame & Summary) */}
			<VideoContentLeft video={video} nextVideoUrl={nextVideoUrl!} />

			{/* Right (Video Playlist) */}
			<VideoContentRight playlistId={params.videoPlaylistId} />
		</section>
	);
}
