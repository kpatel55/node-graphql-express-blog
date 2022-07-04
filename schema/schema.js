const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');
const User = require('../model/user');
const Post = require('../model/post');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'GraphQL object type for a blog user',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        job: { type: GraphQLString },
        company: { type: GraphQLString },
        summary: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ userId: parent.id });
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'GraphQL object type for a blog post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'GraphQL object type for the root query',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Post.findById(args.id);
            }
        },
        postsByUser: {
            type: new GraphQLList(PostType),
            args: { 
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Post.find({ userId: args.userId });
            }
        },
        postsAll: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'GraphQL object type for the mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                job: { type: new GraphQLNonNull(GraphQLString) },
                company: { type: new GraphQLNonNull(GraphQLString) },
                summary: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let user = User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    job: args.job,
                    company: args.company,
                    summary: args.summary
                });
                return user.save();
            }
        },
        createPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                imageUrl: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let post = Post({
                    title: args.title,
                    category: args.category,
                    imageUrl: args.imageUrl,
                    description: args.description,
                    userId: args.userId,
                });
                return post.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});