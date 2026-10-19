import type { Plugin } from 'vite'
import { relative, resolve } from 'node:path'
import { generateContent } from './generate-content.ts'

const moduleId = 'virtual:prop-content'
const resolvedId = `\0${moduleId}`

export function contentPlugin(): Plugin {
    let root: string
    let compiled: Promise<string> | undefined
    function compile() {
        return compiled ??= generateContent(root).then(data => `export default ${JSON.stringify(data)}`)
    }
    return {
        name: 'prop-content',
        configResolved(config) {
            root = config.root
        },
        resolveId(id) {
            if (id === moduleId)
                return resolvedId
        },
        load(id) {
            if (id === resolvedId)
                return compile()
        },
        configureServer(server) {
            const directory = resolve(root, 'content')
            server.watcher.add(directory)
            let pending = Promise.resolve()
            const onChange = (event: string, file: string) => {
                const path = relative(directory, file)
                if (!['add', 'change', 'unlink'].includes(event) || path.startsWith('..') || !/\.(?:md|ya?ml)$/.test(path))
                    return
                pending = pending.then(async () => {
                    compiled = undefined
                    await compile()
                    for (const environment of Object.values(server.environments)) {
                        const module = environment.moduleGraph.getModuleById(resolvedId)
                        if (module)
                            environment.moduleGraph.invalidateModule(module)
                        environment.hot.send({ type: 'full-reload' })
                    }
                }).catch((error: Error) => {
                    server.config.logger.error(error.stack ?? error.message)
                    server.ws.send({ type: 'error', err: { message: error.message, stack: error.stack ?? '' } })
                })
            }
            server.watcher.on('all', onChange)
            server.httpServer?.once('close', () => server.watcher.off('all', onChange))
        },
    }
}
