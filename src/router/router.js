import Button from '@showcase/button'
import Cell from '@showcase/cell'
import Header from '@showcase/header'

const routes = [{
  path: '*',
  redirect: '/navigation'
}, {
  path: '/navigation',
  component: require('@showcase/navigation')
}, {
  path: '/button',
  component: Button
}, {
  path: '/cell',
  component: Cell
}, {
  path: '/header',
  component: Header
}]

export default routes
