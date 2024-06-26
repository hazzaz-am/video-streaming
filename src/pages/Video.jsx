import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RelatedVideosList from "../components/related-videos/RelatedVideosList";
import Loading from "../components/ui/Loading";
import VideoDescription from "../components/video-description/VideoDescription";
import VideoPlayer from "../components/video-description/VideoPlayer";
import { fetchSingleVideo } from "../features/singleVideo/singleVideoSlice";

const Video = () => {
	const { video, isLoading, isError, error } = useSelector(
		(state) => state.video
	);
	const dispatch = useDispatch();
	const { videoId } = useParams();

	const { link, title, id, description, tags, date } = video;

	useEffect(() => {
		dispatch(fetchSingleVideo(videoId));
	}, [dispatch, videoId]);

	let content = null;

	if (isLoading) {
		content = <Loading />;
	}

	if (!isLoading && isError) {
		content = <div className="col-span-12">{error}</div>;
	}

	if (!isLoading && !isError && !video?.id) {
		content = <div className="col-span-12">No Video Found</div>;
	}

	if (!isLoading && !isError && video?.id) {
		content = (
			<div className="grid grid-cols-3 gap-2 lg:gap-8">
				<div className="col-span-full w-full space-y-8 lg:col-span-2">
					<VideoPlayer link={link} title={title} />
					<VideoDescription desc={description} date={date} title={title} />
				</div>
				<RelatedVideosList currentVideoId={id} tags={tags} />
			</div>
		);
	}

	return (
		<section className="pt-6 pb-20">
			<div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
				{content}
			</div>
		</section>
	);
};

export default Video;
