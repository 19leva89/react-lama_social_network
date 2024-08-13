import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

import "./style.scss";

const Comments = ({ postId }) => {
	const [description, setDescription] = useState("");
	const { currentUser } = useContext(AuthContext);

	const { isLoading, error, data } = useQuery({
		queryKey: ["comments", postId],
		queryFn: () => makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (newComment) => {
			return makeRequest.post("/comments", newComment);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	const handleClick = async (e) => {
		e.preventDefault();
		mutation.mutate({ description, postId });
		setDescription("");
	};

	return (
		<div className="comments">
			<div className="write">
				<img src={"/upload/" + currentUser.profilePicture} alt="" />
				<input
					type="text"
					placeholder="write a comment"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button onClick={handleClick}>Send</button>
			</div>
			{error
				? "Something went wrong"
				: isLoading
					? "loading"
					: data.map((comment) => (
						<div className="comment">
							<img src={"/upload/" + comment.profilePicture} alt="" />
							<div className="info">
								<span>{comment.name}</span>
								<p>{comment.description}</p>
							</div>
							<span className="date">
								{moment(comment.createdAt).fromNow()}
							</span>
						</div>
					))}
		</div>
	);
};

export default Comments;
