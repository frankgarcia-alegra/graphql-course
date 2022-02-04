const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull } = require("graphql");
const { UserType, PostType, HobbyType } = require("./types");
const { User, Post, Hobby } = require('../model');

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		CreateUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				profession: { type: GraphQLString },
			},
			resolve(parent, args) {
				let user = new User({ name: args.name, age: args.age, profession: args.profession })
				return user.save();
			}
		},
		UpdateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLInt },
				profession: { type: GraphQLString },
			},
			resolve(parent, args) {
				return User.findByIdAndUpdate(args.id, {
					$set: {
						name: args.name, age: args.age, profession: args.profession
					}
				}, { new: true });
			}
		},
		DeleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return User.findByIdAndDelete(args.id);
			}
		},
		CreatePost: {
			type: PostType,
			args: {
				comment: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				// esta fn pasa antes de devolver el verdadero objeto Post
				// por lo que no hay que hacer la busqueda del user aca
				// si no que la hace el PostType
				let post = new Post({ comment: args.comment, userId: args.userId })
				return post.save();
			}
		},
		UpdatePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				comment: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				return Post.findByIdAndUpdate(args.id, {
					$set: {
						comment: args.comment 
					}
				}, { new: true });
			}
		},
		CreateHobby: {
			type: HobbyType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				userId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let hobby = new Hobby({ title: args.title, description: args.description, userId: args.userId })
				return hobby.save();
			}
		},
		UpdateHobby: {
			type: HobbyType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Hobby.findByIdAndUpdate(args.id, {
					$set: {
						title: args.title, description: args.description
					}
				}, { new: true });
			}
		}
	}
})



module.exports = { Mutation }