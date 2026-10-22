import ReactGenerator from '@teleporthq/teleport-component-generator-react'

export type TeleportNode = {
  type: 'element' | 'static'
  content?: any
  children?: TeleportNode[]
}

export type TeleportUIDL = {
  name: string
  node: TeleportNode
}

export const visualBuilderJson: TeleportUIDL = {
  name: 'TuariHeroCard',
  node: {
    type: 'element',
    content: {
      elementType: 'container',
      children: [
        {
          type: 'element',
          content: {
            elementType: 'text',
            children: [
              {
                type: 'static',
                content: 'Hello from Tuari + Teleport'
              }
            ]
          }
        }
      ]
    }
  }
}

export async function generateComponentFromUIDL(uidl: TeleportUIDL) {
  const result = await ReactGenerator.generateComponent(uidl)
  return result.files
}

async function main() {
  const files = await generateComponentFromUIDL(visualBuilderJson)
  console.log('Generated files:')
  console.log(files.map((file) => file.name).join('\n'))
  console.log('\n--- first generated file ---')
  console.log(files[0]?.content ?? 'No output generated')
}

main().catch((error) => {
  console.error('Teleport generation failed:', error)
  process.exit(1)
})
