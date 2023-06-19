import VideoPlaylistSection from './VideoPlaylistSection';

// * Props
interface IProps {
	playlistId: string;
}

// * Video Playlist Section
export default function VideoContentRight({ playlistId }: IProps) {
	return (
		<div className="flex w-full lg:w-1/3 flex-col space-y-12">
			{/* Video Playlist */}
			{/* @ts-expect-error Server Component */}
			<VideoPlaylistSection playlistId={playlistId} />
		</div>
	);
}
