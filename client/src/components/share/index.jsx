import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

import Map from "../../assets/map.png";
import Image from "../../assets/img.png";
import Friend from "../../assets/friend.png";

const Share = () => {
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");

	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await makeRequest.post("/upload", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const { currentUser } = useContext(AuthContext);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (newPost) => makeRequest.post("/posts", newPost),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleClick = async (e) => {
		e.preventDefault();
		let imgUrl = "";
		if (file) imgUrl = await upload();
		mutation.mutate({ description, img: imgUrl });
		setDescription("");
		setFile(null);
	};

	return (
		<div className="share">
			<div className="container">
				<div className="share__top">
					<div className="share__top--left">
						<img src={"/upload/" + encodeURIComponent(currentUser.profilePicture)} alt="" />

						<input
							type="text"
							id="postDescription"
							name="description"
							placeholder={`What's on your mind ${currentUser.name}?`}
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						/>
					</div>

					<div className="share__top--right">
						{file && (
							<img className="file" alt="" src={URL.createObjectURL(file)} />
						)}
					</div>
				</div>

				<hr />

				<div className="share__bottom">
					<div className="share__bottom--left">
						<input
							type="file"
							id="file"
							style={{ display: "none" }}
							onChange={(e) => setFile(e.target.files[0])}
						/>

						<label htmlFor="file">
							<div className="item">
								<img src={Image} alt="" />
								<span>Add Image</span>
							</div>
						</label>

						<div className="item">
							<img src={Map} alt="" />
							<span>Add Place</span>
						</div>

						<div className="item">
							<img src={Friend} alt="" />
							<span>Tag Friends</span>
						</div>
					</div>

					<div className="share__bottom--right">
						<button onClick={handleClick}>Share</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Share;
