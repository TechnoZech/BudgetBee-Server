import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		type: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Category", categorySchema);
