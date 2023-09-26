import * as fs from 'fs'
import * as path from 'path'
import { register } from 'tsconfig-paths'

const tsConfig = fs.readFileSync(path.resolve('tsconfig.json'))

register({
  baseUrl: './dist',
  paths: JSON.parse(tsConfig.toString()).compilerOptions.paths,
})
