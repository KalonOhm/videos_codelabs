'use client';

import { Subject } from '@prisma/client';
import VideoFrameSection from './VideoFrameSection';
import VideoSummarySection from './VideoSummarySection';
import { useRouter } from 'next/navigation';

// * Props
interface IProps {
	video: {
		id: string;
		name: string;
		youtubeId: string;
		subjects: Subject[];
	};
	nextVideoUrl: string;
}

export default function VideoContentLeft({ video, nextVideoUrl }: IProps) {
	// * Router
	const router = useRouter();
	// * Handlers
	const handleNextVideo = () => {
		console.log({'next video': nextVideoUrl});
		router.push(nextVideoUrl);
		//edge cases end of a playlist (find next playlist)
		//no playlists? don't call/hide button
	};

	// * Render
	return (
		<div className="flex w-full lg:w-2/3 flex-col space-y-12">
			{/* Video Frame */}
			<VideoFrameSection video={video} next={() => handleNextVideo()} nextVideoUrl={nextVideoUrl}/>

			{/* Summary */}
			<VideoSummarySection summary="" subjects={video.subjects} />
		</div>
	);
}
