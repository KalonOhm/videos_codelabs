import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// * Get Video Playlist
export default async function getVideoPlaylist(videoPlaylistId: string) {
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
