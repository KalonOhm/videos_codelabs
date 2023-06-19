import { Subject } from '@prisma/client';

// * Props
interface IProps {
	summary: string;
	subjects: Subject[];
}

// * Video Summary Section
export default function VideoSummarySection({ summary, subjects }: IProps) {
	return (
		<article className="rounded-md p-6 shadow-lg">
			<h2 className="text-2xl font-bold">Summary</h2>

			<p className="mt-4 text-lg text-slate-800">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam quod, quia, voluptas,
				voluptate quae voluptates quibusdam quos quidem consequuntur voluptatum. Quisquam, quod. Quisquam quod,
				quia, voluptas, voluptate quae voluptates quibusdam quos quidem consequuntur voluptatum.
			</p>

			{/* Subjects */}
			<ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{subjects?.map((subject) => (
					<li key={subject} className="flex items-center justify-between rounded-md p-4 shadow-lg">
						<h3 className="text-lg font-bold text-slate-900">{subject}</h3>
					</li>
				))}
			</ul>
		</article>
	);
}
