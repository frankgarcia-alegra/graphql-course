const _ = require('lodash');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} = require('graphql');
const { User, Post, Hobby } = require('../model');

const UserType = new GraphQLObjectType({
	name: "User",
	description: "An User is the main role in this app",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString },
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return Hobby.find({ userId: parent.id });
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find({ userId: parent.id });
			}
		}
	})
})

const HobbyType = new GraphQLObjectType({
	name: "Hobby",
	description: "A Hobby it's an activity a User can do and it's related to",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.userId);
			}
		}
	})
})

const PostType = new GraphQLObjectType({
	name: "Post",
	description: "A Post it's a section where an User can write down their thoughts",
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				console.log(parent, args);
				return User.findById(parent.userId);
			}
		}
	})
})

module.exports = { UserType, HobbyType, PostType }