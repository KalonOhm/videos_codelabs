'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";


interface IProps {
  videoId: string;
  name: string;
  youtubeId: string;
  videoPlaylist: string;
}

export default function VideoPlaylistEntry({ videoId, name, youtubeId, videoPlaylist }: IProps) {

  const router = useRouter();

  const handleClick = () => router.push(`/videos/${videoPlaylist}/${videoId}`)
  // * Render
  return (
    <button onClick={handleClick} className="flex items-center justify-between rounded-md w-full bg-slate-50 py-5 px-2 text-slate-800 hover:bg-slate-100 hover:text-slate-900">
							<input
								// checked={false}
								type="checkbox" 
								readOnly
								className="z-30 ml-2 mr-4 h-5 w-5 rounded border-slate-300 text-slate-800 checked:bg-green-700 focus:ring-slate-500">
							</input>
							<h3 className="text-lg font-medium text-slate-900">{name}</h3>
							<Image src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`} alt={`${name} thumbnail`} width={100} height={100}/>

						</button>
  );
}
