import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Stories = () => {
	const { currentUser } = useContext(AuthContext);

	const { isLoading, error, data } = useQuery({
		queryKey: ["stories"],
		queryFn: () => makeRequest.get("/stories").then((res) => res.data),
	});

	//TODO Add story using react-query mutations and use upload function.

	return (
		<div className="stories">
			<div className="story">
				<img src={"/upload/" + encodeURIComponent(currentUser.profilePicture)} alt="" />
				<span>{currentUser.name}</span>
				<button>+</button>
			</div>

			{error
				? "Something went wrong"
				: isLoading
					? "loading"
					: data.map((story) => (
						<div className="story" key={story.id}>
							<img src={"/upload/" + encodeURIComponent(story.img)} alt="" />
							<span>{story.name}</span>
						</div>
					))}
		</div>
	);
};

export default Stories;
