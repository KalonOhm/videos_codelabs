'use client';

// * Imports
import Button from '@/components/UI/Button';
import { Subject } from '@prisma/client';
import { useState } from 'react';

// * Props
interface IProps {
	video: {
		id: string;
		name: string;
		youtubeId: string;
		subjects: Subject[];
	};
	next: () => void;
	nextVideoUrl?: string;
}

// * Video Frame Section
export default function VideoFrameSection({ video, next, nextVideoUrl}: IProps) {
	// * State
	const [loading, setLoading] = useState(false);

	// * Render
	return (
		<article className="rounded-md p-6 shadow-lg">
			<h2 className="mb-4 text-lg font-medium text-slate-800 xl:text-xl">{video.name}</h2>

			<iframe
				width="1280"
				height="720"
				src={`https://www.youtube.com/embed/${video.youtubeId}`}
				title="Loading Title"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="aspect-video h-full min-h-[200px] w-full rounded-md lg:h-[500px] xl:h-[550px]"
			></iframe>


			{nextVideoUrl ? (
				<Button className="mt-4 w-full" onClick={next} loading={loading}>
				Next Video
			</Button>
			) : (
				<Button className="mt-4 w-full" disabled>
          End of videos
        </Button>
			)}
		</article>
	);
}
