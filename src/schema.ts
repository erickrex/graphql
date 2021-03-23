import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { GraphQLDateTime } from 'graphql-iso-date'
import { Context } from './context'

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    
    t.nonNull.list.nonNull.field('allAnswers', {
      type: 'Answer',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.answer.findMany()
      },
    })

  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {

    t.nonNull.field('insertAnswer', {
      type: 'Answer',
      args: {
        data: nonNull(
            arg({
                type: 'AnswerCreateInput',
              }),
            ),
            
          }, 
      resolve: (_, args, context: Context) =>
        { return context.prisma.answer.create({
          data: {
            
            entryAt: args.data.entryAt,
            answer: args.data.answer,
          },
        })
      },
    })

    t.field('deleteAnswer', {
      type: 'Answer',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.answer.delete({
          where: { id: args.id },
        })
      },
    })
  },
})


const Answer = objectType({
    name: 'Answer',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.field('entryAt', { type: 'DateTime' })
      t.string('answer')
    },
})

const AnswerCreateInput = inputObjectType({
  name: 'AnswerCreateInput',
  definition(t) {
    t.nonNull.int('id')
      t.nonNull.field('entryAt', { type: 'DateTime' })
      t.string('answer')
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Answer,
    DateTime,
    AnswerCreateInput
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
