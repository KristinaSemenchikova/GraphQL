const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

const paintings = [
    { id: 1, name: 'Starry night', artForm: 'impressionism', artistID: 1 },
    { id: 2, name: 'Field', artForm: 'impressionism', artistID: 1 }
];
const artists = [
    { id: 1, name: 'Vincent van Gog', birth: 1854 }
];

const PaintingType = new GraphQLObjectType(
    {
        name: 'Painting',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            artForm: { type: GraphQLString },
            artist: {
                type: ArtistType,
                resolve(parent, args) {
                    return artists.find(item => item.id == parent.id)
                }
            }
        }),
    });
const ArtistType = new GraphQLObjectType(
    {
        name: 'Artist',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            birth: { type: GraphQLInt },
            painting: {
                type: new GraphQLList(PaintingType),
                resolve(parent, args) {
                    return paintings.filter(item => item.artistID == parent.id)
                }
            }
        })
    }
);
const Query = new GraphQLObjectType(
    {
        name: 'Query',
        fields: {
            painting: {
                type: PaintingType,
                args: { id: { type: GraphQLID } },
                resolve(parent, args) {
                    return paintings.find(item => item.id == args.id)
                }
            },
            artist: {
                type: ArtistType,
                args: { id: { type: GraphQLID } },
                resolve(parent, args) {
                    return artists.find(item => item.id == args.id)
                }
            },
            paintings : {
                type : new GraphQLList (PaintingType),
                resolve(parent, args){
                    return paintings;
                }
            },
            artists : {
                type : new GraphQLList (ArtistType),
                resolve(parent, args){
                    return artists;
                }
            }
        }
    }
);

module.exports = new GraphQLSchema(
    {
        query: Query,
    }
)
