exports.createPages = async ({ actions, graphql, reporter}) => {
  const { createPage } = actions

  const bikeSpecTemplate = require.resolve(`./src/bikeSpecTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  //Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GQL query`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path:node.frontmatter.slug,
      component: bikeSpecTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
