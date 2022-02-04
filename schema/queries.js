const _ = require('lodash');
const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const { UserType, HobbyType, PostType } = require('./types');
const { User, Post, Hobby } = require('../model');

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Root query description",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// es donde se resuelve con la informacion obtenida
				// pudiendo hacer pasos extra antes de enviar la data
				return User.findById(args.id);
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find();
			}
		},
		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Hobby.findById(args.id);
			}
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return Hobby.find();
			}
		},
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id);
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find();
			}
		}
	}
})

module.exports = { RootQuery };