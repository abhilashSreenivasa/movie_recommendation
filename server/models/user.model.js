const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true, unique:true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		favourites:[
			{
				mid:{type:Number,unique:true},
				title:{type:String, default:""},
				desc:{type:String, default:""},
				date:{type:String, default:""},
				rating:{type:Number, default:""},
				imageURL:{type:String, default:""}

			}
		],
		watchLater:[
			{
				
				title:{type:String, default:""},
				desc:{type:String, default:""},
				date:{type:String, default:""},
				rating:{type:Number, default:""},
				imageURL:{type:String, default:""}

			}
		]

	},
	{ collection: 'userdata' }
)

const model = mongoose.model('UserData', User)

module.exports = model