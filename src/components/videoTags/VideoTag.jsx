import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../features/tags/tagsSlice";
import Tag from "./Tag";

const VideoTag = () => {
	const { tags } = useSelector((state) => state.tags);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTags());
	}, [dispatch]);

	return tags.length > 0 ? (
		<section>
			<div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
				{tags.map((tag) => (
					<Tag key={tag.id} title={tag.title} />
				))}
			</div>
		</section>
	) : null;
};

export default VideoTag;

// selected tag design
{
	/* <div
class="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
>
redux
</div> */
}
